import { DELETE_USER, RESET_STATE, SAVE_USER, UPDATE_STATE } from "./actions";

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
    case SAVE_USER:
      localStorage.setItem("user", JSON.stringify(action.payload)); // payload == user
      return { ...state, user: action.payload };
    case DELETE_USER:
      localStorage.removeItem("user");
      return { ...state, user: action.payload };
    case UPDATE_STATE:
      return { ...state, ...action.payload };
    case RESET_STATE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
