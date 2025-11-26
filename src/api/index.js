import axios from "axios";
import store from "../redux/store";
import { logout, refreshAccessToken } from "../redux/actions/authAction";

const LIVE_URL = "https://your-production-backend-url.com";

const devApis = {
  AUTH: "http://localhost:5000/api/org",
  VENDOR: "http://localhost:5000/api/vendors",
  MEMBER: "http://localhost:5000/api/members",
  EVENT: "http://localhost:5000/api/events",
  SUBEVENT: "http://localhost:5000/api/subevents",

};

const prodApis = {
  AUTH: `${LIVE_URL}/api/auth`,
  VENDOR: `${LIVE_URL}/api/vendors`,
  MEMBER: `${LIVE_URL}/api/members`,
  EVENT: `${LIVE_URL}/api/events`,
  SUBEVENT: `${LIVE_URL}/api/subevents`,

};

const getApiUrls = () => {
  const env = process.env.REACT_APP_ENV; // dev / prod
  return env === "prod" ? prodApis : devApis;
};

export const APIS = getApiUrls();

// Create Axios instances
export const authApi = axios.create({ baseURL: APIS.AUTH });
export const vendorApi = axios.create({ baseURL: APIS.VENDOR });
export const memberApi = axios.create({ baseURL: APIS.MEMBER });
export const eventApi = axios.create({ baseURL: APIS.EVENT });
export const subeventApi = axios.create({ baseURL: APIS.SUBEVENT });



/**
 * Attach Interceptors
 */
const attachInterceptors = (instance) => {
  // REQUEST INTERCEPTOR
  instance.interceptors.request.use(
    (config) => {
      const state = store.getState();
      const token = state?.org?.accessToken; 

      console.log("Interceptor request running. Token:", token);

      if (token) config.headers.Authorization = `Bearer ${token}`;
      return config;
    },
    (error) => {
      console.error("Request Interceptor Error:", error);
      return Promise.reject(error);
    }
  );

  let isRefreshing = false;
  let pendingRequestsQueue = [];

  // RESPONSE INTERCEPTOR
  instance.interceptors.response.use(
    (res) => res,
    async (err) => {
      console.log("Interceptor response error:", err?.response?.status);

      const originalRequest = err.config;

      if (err?.response?.status === 401 && !originalRequest?._retry) {
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
            console.error("Token refresh failed:", refreshError);
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
[authApi].forEach(attachInterceptors);
