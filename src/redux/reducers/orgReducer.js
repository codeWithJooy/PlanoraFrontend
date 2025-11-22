import { ORG_SIGNUP,ORG_LOGIN,REFRESH_SUCCESS,ORG_LOGOUT } from "../actionTypes/orgActionTypes";
const initialState = {
    org: JSON.parse(localStorage.getItem("org")) || null,
    accessToken: localStorage.getItem("accessToken") || null,
    refreshToken: localStorage.getItem("refreshToken") || null,
  };
  
  export default function orgReducer(state = initialState, action) {
    switch (action.type) {
      case ORG_SIGNUP:
      case ORG_LOGIN : 
      case REFRESH_SUCCESS:
        localStorage.setItem("accessToken", action.payload.accessToken);
        localStorage.setItem("refreshToken", action.payload.refreshToken);
        localStorage.setItem("org", JSON.stringify(action.payload.org));
        return { ...state, ...action.payload };
  
      case ORG_LOGOUT:
        localStorage.clear();
        return { user: null, accessToken: null, refreshToken: null };
  
      default:
        return state;
    }
  }
  