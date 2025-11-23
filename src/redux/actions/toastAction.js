import { UPDATE_TOAST,REVOKE_TOAST } from "../actionTypes/toastTypes";
import store from "../store";
const { dispatch } = store;

export const updateToast = (params) => {
  dispatch({
    type: UPDATE_TOAST,
    payload: {
      code: params.code,
      title: params.title,
      message: params.message,
    },
  });
};

export const revokeToast = () => {
  dispatch({ type: REVOKE_TOAST });
};