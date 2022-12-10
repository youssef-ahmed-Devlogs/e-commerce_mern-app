import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { authReducer } from "./auth/reducer";
import { usersReducer } from "./users/reducer";

const appReducer = combineReducers({
  auth: authReducer,
  users: usersReducer,
});

export const store = createStore(appReducer, applyMiddleware(thunk));
