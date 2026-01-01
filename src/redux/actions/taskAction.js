import { taskApi } from "../../api";
import { CodeAnalogy } from "../../Components/Toast/Toast";
import { getHeaders } from "./actionHelper";
import { updateToast } from "./toastAction";

export const taskRegister = async (data) => {
  try {
    const headers = getHeaders();
    const response = await taskApi.post("/add", data, headers);
    if (response.data.code === 200) {
      updateToast({
        code: CodeAnalogy.SUCCESS,
        title: "Task Created Successfully",
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

export const getAllTasksByEvent = async (data) => {
  try {
    const headers = getHeaders();
    const { orgId, eventId } = data;
    const response = await taskApi.get(`/${orgId}/${eventId}`, headers);
    if (response.data.code === 200) return response.data.data;
    else return [];
  } catch (error) {
    console.log(error.message);
  }
};
