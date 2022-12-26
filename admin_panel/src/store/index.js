import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { authReducer } from "./auth/reducer";
import { usersReducer } from "./users/reducer";
import { paginationReducer } from "./pagination/reducer";
import { filterReducer } from "./filter/reducer";
import { modalReducer } from "./modal/reducer";

const appReducer = combineReducers({
  auth: authReducer,
  users: usersReducer,
  paginationData: paginationReducer,
  mainFilterData: filterReducer,
  modalState: modalReducer,
});

export const store = createStore(appReducer, applyMiddleware(thunk));
