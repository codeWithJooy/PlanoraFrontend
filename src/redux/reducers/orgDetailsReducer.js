import { ORG_DETAILS_ADDED } from "../actionTypes/orgDetails";

const initialState = {
    orgId: "",
    officialAddress:"",
    description:"",
    insta:"",
    website:"",
    teamStrength:"",
    externalVendor:""
  };
  
  export default function orgDetailsReducer(state = initialState, action) {
    switch (action.type) {
      case ORG_DETAILS_ADDED:
        return { ...state, ...action.payload };
      default:
        return state;
    }
  }

  