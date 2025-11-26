import { EVENTS_FETCHED } from "../actionTypes/eventsActionTypes";

const initialState = [];

export default function eventReducer(state = initialState, action) {
  switch (action.type) {
    case EVENTS_FETCHED:
      return action.payload; // Replace list with fresh data
    default:
      return state;
  }
}
