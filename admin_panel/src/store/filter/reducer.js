import { RESET_FILTER, SEARCH, SORT, SORT_ORDER } from "./actions";

export const initialState = {
  search: "",
  sort: "createdAt",
  order: "desc",
};

export const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH:
      return { ...state, search: action.payload };
    case SORT:
      return { ...state, sort: action.payload };
    case SORT_ORDER:
      return { ...state, order: action.payload };
    case RESET_FILTER:
      return action.payload;
    default:
      return state;
  }
};
