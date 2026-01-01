import { messageApi } from "../../api";
import { CodeAnalogy } from "../../Components/Toast/Toast";
import { getHeaders } from "./actionHelper";
import { updateToast } from "./toastAction";

export const messageRegister = async (data) => {
  try {
    const headers = getHeaders();
    const response = await messageApi.post("/", data, headers);
    if (response.data.code === 200) {
      updateToast({
        code: CodeAnalogy.SUCCESS,
        title: "Message Sent Successfully",
        message: "",
      });
      return true;
    } else return false;
  } catch (error) {
    console.log(error.message);
    updateToast({
      code: CodeAnalogy.ERROR,
      title: "Something Went Wrong",
      message: error.message,
    });
    return false;
  }
};

export const fetchMessages = async (data) => {
  try {
    const headers = getHeaders();
    const { orgId, eventId } = data;
    const response = await messageApi.get(`/${orgId}/${eventId}`, headers);
    if (response.data.code === 200) return response.data.data;
    else return [];
  } catch (error) {
    console.log(error.message);
  }
};
