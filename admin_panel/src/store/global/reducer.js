const initialState = {
  BASE_URL: "/api/v1",
};

export const globalReducer = (state = initialState, action) => {
  switch (action.type) {
    case "":
      return state;
    default:
      return state;
  }
};
