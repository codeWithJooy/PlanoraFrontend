import { ORG_LOGIN } from "../actionTypes/orgActionTypes";
import { authApi } from "../../api";
import { dispatchAction } from "./actionHelper";

export const orgLogin = async (data) => {
    try {
      const org= {
        ogrEmail: data.email,
        orgPassword: data.password,
      };
  
      const response = await authApi.post("/login", org);
  
      if (response.data.code == 200) {
        dispatchAction(ORG_LOGIN,{
            org:response.data.org,
            accessToken:response.data.accessToken,
            refreshToken:response.data.refreshToken,
        });
        return true;
      } else return false;
    } catch (error) {
      console.log(error.message);
    }
  };

  export const refreshAccessToken = () => async (dispatch, getState) => {
    const refreshToken = getState().user.refreshToken;
    if (!refreshToken) throw new Error("Missing Token");
  
    const { data } = await authApi.post("/auth/refresh-token", { refreshToken });
  
    dispatch({
      type: "REFRESH_SUCCESS",
      payload: {
        user: getState().user.user,
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      },
    });
  
    return data.accessToken;
  };
  
  export const logout = () => async (dispatch, getState) => {
    const refreshToken = getState().user.refreshToken;
    await authApi.post("/auth/logout", { refreshToken });
    dispatch({ type: "LOGOUT" });
  };