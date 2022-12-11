import { initialState } from "./reducer";

export const SORT = "SORT";
export const SORT_ORDER = "SORT_ORDER";
export const SEARCH = "SEARCH";
export const RESET_FILTER = "RESET_FILTER";

export const sortFilter = (sortBy) => {
  return {
    type: SORT,
    payload: sortBy,
  };
};

export const sortOrderFilter = (sortOrder) => {
  return {
    type: SORT_ORDER,
    payload: sortOrder,
  };
};

export const searchFilter = (searchTerm) => {
  return {
    type: SEARCH,
    payload: searchTerm,
  };
};

export const resetFilter = () => {
  return {
    type: RESET_FILTER,
    payload: initialState,
  };
};
