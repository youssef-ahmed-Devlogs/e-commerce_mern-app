import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { authReducer } from "./auth/reducer";

const appReducer = combineReducers({
  auth: authReducer,
});

export const store = createStore(appReducer, applyMiddleware(thunk));
