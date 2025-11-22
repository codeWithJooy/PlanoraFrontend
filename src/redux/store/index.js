import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import rootReducers from "../reducers";

const loggerMiddleware = createLogger();
const store = createStore(
  rootReducers,
  applyMiddleware(thunk, loggerMiddleware)
);

export default store;