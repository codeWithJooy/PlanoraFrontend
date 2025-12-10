import { memberApi } from "../../api";
import { CodeAnalogy } from "../../Components/Toast/Toast";
import { MEMBERS_FETCHED } from "../actionTypes/memberActionTypes";
import { dispatchAction, getHeaders } from "./actionHelper";
import { updateToast } from "./toastAction";

export const teamRegister = async (data) => {
  try {
    const headers = getHeaders();
    const response = await memberApi.post("/register", data, headers);
    if (response.data.code === 200) {
      updateToast({
        code: CodeAnalogy.SUCCESS,
        title: "Member Added Successfully",
        message: "",
      });
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const getAllMembers = async (orgId) => {
  try {
    const headers = getHeaders();
    const response = await memberApi.get(`/member/${orgId}`, headers);
    if (response.data.code === 200) {
      dispatchAction(MEMBERS_FETCHED, response.data.members);
      return response.data.members;
    }
  } catch (error) {
    console.log(error.message);
  }
};
