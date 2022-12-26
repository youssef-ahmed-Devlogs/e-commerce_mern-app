import { CLOSE_CONFIRM_MODAL, SHOW_CONFIRM_MODAL } from "./action";

const initialState = {
  confirmModalShow: false,
  otherModalShow: false,
};

export const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_CONFIRM_MODAL:
      return { ...state, confirmModalShow: action.payload };
    case CLOSE_CONFIRM_MODAL:
      return { ...state, confirmModalShow: action.payload };
    default:
      return state;
  }
};
