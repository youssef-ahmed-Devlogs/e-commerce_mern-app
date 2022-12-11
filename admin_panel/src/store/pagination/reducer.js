import {
  CHANGE_LIMIT,
  CHANGE_PAGE,
  CHANGE_PAGINATION_NUMS_COUNT,
  RESET_PAGINATION,
} from "./action";

const initialState = {
  page: 1,
  limit: 5,
  paginationNumsCount: 3,
};

export const paginationReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_PAGE:
      return { ...state, page: action.payload };
    case CHANGE_LIMIT:
      return { ...state, limit: action.payload };
    case CHANGE_PAGINATION_NUMS_COUNT:
      return { ...state, paginationNumsCount: action.payload };
    case RESET_PAGINATION:
      return action.payload;
    default:
      return state;
  }
};
