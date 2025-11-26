import { combineReducers } from "redux";
import orgReducer from "./orgReducer";
import toastReducer from "./toastReducer";
import orgDetailsReducer from "./orgDetailsReducer";
import eventReducer from "./eventReducer";
import singleEventReducer from "./singleEventReducer";

const rootReducers=combineReducers({
    org:orgReducer,
    orgDetails:orgDetailsReducer,
    toast:toastReducer,
    events:eventReducer,
    singleEvent:singleEventReducer,
})

export default rootReducers;