import { combineReducers } from "redux";
import orgReducer from "./orgReducer";
import toastReducer from "./toastReducer";
import orgDetailsReducer from "./orgDetailsReducer";

const rootReducers=combineReducers({
    org:orgReducer,
    orgDetails:orgDetailsReducer,
    toast:toastReducer
})

export default rootReducers;