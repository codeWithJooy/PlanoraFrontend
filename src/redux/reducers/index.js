import { combineReducers } from "redux";
import orgReducer from "./orgReducer";

const rootReducers=combineReducers({
    org:orgReducer
})

export default rootReducers;