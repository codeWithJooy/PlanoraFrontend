import { SUB_EVENTS_FETCHED } from "../actionTypes/subeventActionTypes";

const initialState = [];

export default function subEventReducer(state = initialState, action) {
  switch (action.type) {
    case SUB_EVENTS_FETCHED:
      return action.payload; 
    default:
      return state;
  }
}
