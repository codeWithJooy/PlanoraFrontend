import { VENDORS_FETCHED } from "../actionTypes/vendorActionTypes";
import { vendorApi } from "../../api";
import { dispatchAction, getHeaders } from "./actionHelper";
import { CodeAnalogy } from "../../Components/Toast/Toast";
import { updateToast } from "./toastAction";

export const vendorRegister = async (data) => {
  try {
    const headers = getHeaders();
    const response = await vendorApi.post("/register", data, headers);
    if (response.data.code === 200) {
      updateToast({
        code: CodeAnalogy.SUCCESS,
        title: "Vendor Added Successful",
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

export const getAllVendors = async (orgId) => {
  try {
    const headers=getHeaders();
    const response=await vendorApi.get(`/${orgId}`,headers)
    if(response.data.code===200){
        dispatchAction(
            VENDORS_FETCHED,
            response.data.vendors
        )
        return response.data.vendors
    }
    else return []
  } catch (error) {
    console.log(error.message);
  }
};
