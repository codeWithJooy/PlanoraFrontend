import { MEMBERS_FETCHED } from "../actionTypes/memberActionTypes";

const initialState = [];

export default function membereducer(state = initialState, action) {
  switch (action.type) {
    case MEMBERS_FETCHED:
      return {
        ...state,
        members: action.payload.members,
      };
    default:
      return state;
  }
}
