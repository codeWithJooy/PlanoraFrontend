import { guestApi } from "../../api";
import { CodeAnalogy } from "../../Components/Toast/Toast";
import { getHeaders } from "./actionHelper";
import { updateToast } from "./toastAction";

export const guestUpload = async (data) => {
  try {
    const headers = getHeaders();
    const response = await guestApi.post("/bulk-upload", data, headers);
    if (response.data.code === 200) {
      updateToast({
        code: CodeAnalogy.SUCCESS,
        title: "Guest Data Added Successfully",
      });
      return true;
    }
  } catch (error) {
    console.log(error.message);
    updateToast({
      code: CodeAnalogy.ERROR,
      title: "Something Went Wrong",
      message: "Please Try Again",
    });
  }
};
export const getAllGuests = async () => {
  try {
    const headers = getHeaders();
    const response = await guestApi.get("", headers);
    if (response.data.code === 200) {
      return response.data.guests;
    } else return [];
  } catch (error) {
    console.log(error.message);
    updateToast({
      code: CodeAnalogy.ERROR,
      title: "Something Went Wrong",
      message: "Please Try Again",
    });
  }
};
