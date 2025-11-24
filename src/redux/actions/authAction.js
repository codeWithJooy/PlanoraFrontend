import { ORG_LOGIN } from "../actionTypes/orgActionTypes";
import { authApi } from "../../api";
import { dispatchAction, getHeaders } from "./actionHelper";
import { CodeAnalogy } from "../../Components/Toast/Toast";
import { updateToast } from "./toastAction";
export const orgSignup=async(data)=>{
  try{
    const headers=getHeaders();
    const org={
      orgName:data.orgName,
      orgPhone:data.orgPhone,
      orgEmail:data.orgEmail,
      orgPassword:data.orgPassword,
      type:data.type
    }
    const response=await authApi.post("/register",org,headers)
    if(response.data.code===200){
       updateToast({
        code: CodeAnalogy.SUCCESS,
        title: "Signup Successful",
        message: "Welcome To Planora",
       })
       return true;
    }
  }catch(error){
    console.log(error.message)
  }
}
export const orgLogin = async (data) => {
  try {
    const headers=getHeaders();
    const org = {
      orgEmail: data.email,
      orgPassword: data.password,
    };
    console.log(authApi)
    const response = await authApi.post("/login", org,headers);
    console.log(response)
    if (response.data.code === 200) {
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
