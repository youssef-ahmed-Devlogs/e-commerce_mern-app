import axios from "axios";

export const GET_CATEGORIES = "GET_CATEGORIES";

const URL = `${process.env.REACT_APP_API_URL}/categories`;

const apiOptions = () => {
  const loggedInUser = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : {};

  if (!loggedInUser || !loggedInUser.token) {
    return "noToken";
  }

  return {
    headers: {
      Authorization: `Bearer ${loggedInUser.token}`,
    },
  };
};

export const getCategories = (categories) => {
  return {
    type: GET_CATEGORIES,
    payload: categories,
  };
};

export const fetchCategories = (queries = "") => {
  return async (dispatch) => {
    try {
      const api_options = apiOptions();
      const { data } = await axios.get(`${URL}?${queries}`, api_options);

      dispatch(getCategories(data));
    } catch (error) {
      console.log(error);
    }
  };
};
