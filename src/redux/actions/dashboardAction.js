import { dashApi } from "../../api";
import { getHeaders } from "./actionHelper";

export const getDashEvents = async (orgId) => {
  try {
    const headers = getHeaders();
    const response = await dashApi.get(`/events/${orgId}`, headers);
    if (response.data.code === 200) {
      return response.data.data;
    } else return [];
  } catch (error) {
    console.log(error.message);
  }
};

export const getDashTasks = async (orgId) => {
  try {
    const headers = getHeaders();
    const response = await dashApi.get(`/tasks/${orgId}`, headers);

    if (response.data.code === 200) {
      return response.data.data;
    } else return [];
  } catch (error) {
    console.log(error.message);
  }
};
