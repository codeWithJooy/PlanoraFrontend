import axios from "axios";
import store from "../redux/store";
import { logout, refreshAccessToken } from "../redux/actions/authAction";

const LIVE_URL = "https://your-production-backend-url.com";

const devApis = {
  AUTH: "http://localhost:5000/api/org",
  USER: "http://localhost:5000/api/user",
  CUSTOMER: "http://localhost:5000/api/customer",
  ORDER: "http://localhost:5000/api/order",
};

const prodApis = {
  AUTH: `${LIVE_URL}/api/auth`,
  USER: `${LIVE_URL}/api/user`,
  CUSTOMER: `${LIVE_URL}/api/customer`,
  ORDER: `${LIVE_URL}/api/order`,
};

const getApiUrls = () => {
  const env = process.env.REACT_APP_ENV; // dev / prod
  return env === "prod" ? prodApis : devApis;
};

export const APIS = getApiUrls();

// Create Axios instances by group
export const authApi = axios.create({ baseURL: APIS.AUTH });
export const userApi = axios.create({ baseURL: APIS.USER });
export const customerApi = axios.create({ baseURL: APIS.CUSTOMER });
export const orderApi = axios.create({ baseURL: APIS.ORDER });

/**
 * Add Token Handling & Refresh Support
 */
const attachInterceptors = (instance) => {
  instance.interceptors.request.use((config) => {
    const token = store.getState().user.accessToken;
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  });

  let isRefreshing = false;
  let pendingRequestsQueue = [];

  instance.interceptors.response.use(
    (res) => res,
    async (err) => {
      const originalRequest = err.config;

      if (err.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        if (!isRefreshing) {
          isRefreshing = true;
          try {
            const newAccessToken = await store.dispatch(refreshAccessToken());

            pendingRequestsQueue.forEach((cb) => cb(newAccessToken));
            pendingRequestsQueue = [];

            isRefreshing = false;

            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return instance(originalRequest);
          } catch (refreshError) {
            isRefreshing = false;
            pendingRequestsQueue = [];
            store.dispatch(logout());
            return Promise.reject(refreshError);
          }
        }

        return new Promise((resolve) => {
          pendingRequestsQueue.push((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(instance(originalRequest));
          });
        });
      }

      return Promise.reject(err);
    }
  );
};

// Attach to all instances
[authApi, userApi, customerApi, orderApi].forEach(attachInterceptors);
