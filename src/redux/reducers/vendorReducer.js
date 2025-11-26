import { VENDORS_FETCHED } from "../actionTypes/vendorActionTypes";

const initialState = [];

export default function vendorReducer(state = initialState, action) {
  switch (action.type) {
    case VENDORS_FETCHED:
      return {
        ...state,
        vendors: action.payload.vendors,
      };
    default:
      return state;
  }
}
