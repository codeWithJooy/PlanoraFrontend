import { combineReducers } from "redux";
import orgReducer from "./orgReducer";
import toastReducer from "./toastReducer";

const rootReducers=combineReducers({
    org:orgReducer,
    toast:toastReducer
})

export default rootReducers;