import { combineReducers } from "redux";
import orgReducer from "./orgReducer";
import toastReducer from "./toastReducer";
import orgDetailsReducer from "./orgDetailsReducer";
import eventReducer from "./eventReducer";
import singleEventReducer from "./singleEventReducer";
import subEventReducer from "./subEventReducer";
import membereducer from "./memberReducer";

const rootReducers=combineReducers({
    org:orgReducer,
    orgDetails:orgDetailsReducer,
    toast:toastReducer,
    events:eventReducer,
    singleEvent:singleEventReducer,
    subEvents:subEventReducer,
    member:membereducer
})

export default rootReducers;