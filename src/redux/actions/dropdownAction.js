import { dropApi } from "../../api";
import { getHeaders } from "./actionHelper";

export const getVendorsDrop = async (orgId) => {
  try {
    const headers = getHeaders();
    const response = await dropApi.get(`/vendors/${orgId}`, headers);

    if (response.data.code == 200) {
      return response.data.vendors;
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const getMembersDrop = async (orgId) => {
  try {
    const headers = getHeaders();
    const response = await dropApi.get(`/members/${orgId}`, headers);

    if (response.data.code == 200) {
      return response.data.members;
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const getSubEventDrop = async (eventId) => {
  try {
    const headers = getHeaders();
    const response = await dropApi.get(`/subevent/${eventId}`, headers);

    if (response.data.code === 200) {
      return response.data.subevents;
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const getGuestsDropdown = async (eventId) => {
  try {
    const headers = getHeaders();
    const response = await dropApi.get(`/guests/${eventId}`, headers);

    if (response.data.code === 200) {
      return response.data.guests;
    }
  } catch (error) {
    console.log(error.message);
  }
};
