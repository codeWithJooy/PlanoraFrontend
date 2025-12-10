import { dropApi } from "../../api";
import { getHeaders } from "./actionHelper";

export const getVendorsDrop = async () => {
  try {
    const headers = getHeaders();
    const response = await dropApi.get("/vendors", headers);

    if (response.data.code == 200) {
      return response.data.vendors;
    }
  } catch (error) {
    console.log(error.message);
  }
};
