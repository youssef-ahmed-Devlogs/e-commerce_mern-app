export const CHANGE_PAGE = "CHANGE_PAGE";
export const CHANGE_LIMIT = "CHANGE_LIMIT";
export const CHANGE_PAGINATION_NUMS_COUNT = "CHANGE_PAGINATION_NUMS_COUNT";
export const RESET_PAGINATION = "RESET_PAGINATION";

export const changePage = (page) => {
  return {
    type: CHANGE_PAGE,
    payload: page,
  };
};

export const changeLimit = (limit) => {
  return {
    type: CHANGE_LIMIT,
    payload: limit,
  };
};

export const changePaginationNumsCount = (numsCount) => {
  return {
    type: CHANGE_PAGINATION_NUMS_COUNT,
    payload: numsCount,
  };
};

export const resetPagination = () => {
  const initialState = {
    page: 1,
    limit: 5,
    paginationNumsCount: 3,
  };

  return {
    type: RESET_PAGINATION,
    payload: initialState,
  };
};
