import { CLOSE_DELETE_MODAL, SHOW_DELETE_MODAL } from "./action";

const initialState = {
  show: false,
  data: {},
};

export const deleteModalReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_DELETE_MODAL:
      return action.payload;
    case CLOSE_DELETE_MODAL:
      return initialState;
    default:
      return state;
  }
};
