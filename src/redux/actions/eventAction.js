import { EVENTS_FETCHED, SINGLE_EVENT } from "../actionTypes/eventsActionTypes";
import { eventApi } from "../../api";
import { dispatchAction, getHeaders } from "./actionHelper";
import { CodeAnalogy } from "../../Components/Toast/Toast";
import { updateToast } from "./toastAction";
import { useDispatch } from "react-redux";

// -----------------------------------------
// 1. REGISTER EVENT
// -----------------------------------------
export const eventRegister = async (data) => {
  try {
    const headers = getHeaders();
    const response = await eventApi.post("/register", data, headers);

    if (response.data.code === 200 || response.status === 201) {
      updateToast({
        code: CodeAnalogy.SUCCESS,
        title: "Event Created Successfully",
        message: "",
      });
      return true;
    } else {
      updateToast({
        code: CodeAnalogy.ERROR,
        title: "Failed to Create Event",
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
// 2. GET ALL EVENTS
// -----------------------------------------
export const getAllEvents = async () => {
  try {
    const headers = getHeaders();
    const response = await eventApi.get("/all", headers);

    if (response.data.message || response.status === 200) {
      dispatchAction(EVENTS_FETCHED, response.data.events);

      return response.data.events;
    } else {
      return [];
    }
  } catch (error) {
    console.log(error.message);
    return [];
  }
};

// -----------------------------------------
// 3. GET SINGLE EVENT BY EVENT ID
// -----------------------------------------
export const getSingleEvent = async (eventId) => {
  try {
    const headers = getHeaders();
    const response = await eventApi.get(`/${eventId}`, headers);

    if (response.data.code === 200) {
      dispatchAction(SINGLE_EVENT, response.data.event);
      return true;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error.message);
    return null;
  }
};
