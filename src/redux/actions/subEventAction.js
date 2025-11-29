import { SUB_EVENTS_FETCHED } from "../actionTypes/subeventActionTypes";
import { dispatchAction, getHeaders } from "./actionHelper";
import { subeventApi } from "../../api";
import { CodeAnalogy } from "../../Components/Toast/Toast";
import { updateToast } from "./toastAction";
import { useDispatch } from "react-redux";

// -----------------------------------------
// 1. REGISTER Sub EVENT
// -----------------------------------------
export const subEventRegister = async (data) => {
  try {
    const headers = getHeaders();
    const response = await subeventApi.post("/register", data, headers);

    if (response.data.code === 200 || response.status === 201) {
      updateToast({
        code: CodeAnalogy.SUCCESS,
        title: "Sub Event Created Successfully",
        message: "",
      });
      return true;
    } else {
      updateToast({
        code: CodeAnalogy.ERROR,
        title: "Failed to Create Sub Event",
        message: "",
      });
      return false;
    }
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

// -----------------------------------------
// 2. GET ALL SUB EVENTS BY EVENTID
// -----------------------------------------
export const getAllSubEvents = async (eventId) => {
  try {
    const headers = getHeaders();
    const response = await subeventApi.get(`/event/${eventId}`, headers);

    if (response.data.message || response.status === 200) {
      dispatchAction(SUB_EVENTS_FETCHED, response.data.subEvents);
      return response.data.subEvents;
    } else {
      return [];
    }
  } catch (error) {
    console.log(error.message);
    return [];
  }
};
