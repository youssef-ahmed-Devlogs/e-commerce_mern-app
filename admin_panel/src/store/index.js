import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { authReducer } from "./auth/reducer";
import { usersReducer } from "./users/reducer";
import { paginationReducer } from "./pagination/reducer";
import { filterReducer } from "./filter/reducer";
import { deleteModalReducer } from "./modals/delete/reducer";
import { globalReducer } from "./global/reducer";

const appReducer = combineReducers({
  auth: authReducer,
  users: usersReducer,
  paginationData: paginationReducer,
  mainFilterData: filterReducer,
  deleteModalData: deleteModalReducer,
  globalData: globalReducer,
});

export const store = createStore(appReducer, applyMiddleware(thunk));
