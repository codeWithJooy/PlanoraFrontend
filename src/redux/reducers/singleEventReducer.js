import { SINGLE_EVENT } from "../actionTypes/eventsActionTypes";

const initialState = {
  orgId: "",
  eventId: "",
  eventName: "",
  eventType: "",
  eventLocation: "",
  eventStart: "",
  eventEnd: "",
  eventDescription: "",
};

export default function singleEventReducer(state = initialState, action) {
  switch (action.type) {
    case SINGLE_EVENT:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}
