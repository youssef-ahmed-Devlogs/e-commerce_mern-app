import { RESET_STATE, UPDATE_STATE } from "./actions";

const user = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : {};

const initialState = {
  user,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_STATE:
      return { ...state, ...action.payload };
    case RESET_STATE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
