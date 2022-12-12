import axios from "axios";

const BASE_URL = "/api/v1";
const URL = `${BASE_URL}/users`;

export const GET_USERS = "GET_USERS";
export const ADD_USER = "ADD_USERS";
export const DELETE_USER = "DELETE_USERS";

export const getUsers = (users) => {
  return {
    type: GET_USERS,
    payload: users,
  };
};

export const addUser = (user) => {};
export const deleteUser = (user) => {};

export const fetchUsers = (queries = "") => {
  return async (dispatch) => {
    const loggedInUser = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : {};

    const options = {
      headers: {
        Authorization: `Bearer ${loggedInUser.token}`,
      },
    };

    try {
      if (loggedInUser && loggedInUser.token) {
        const { data } = await axios.get(`${URL}?${queries}`, options);
        dispatch(getUsers(data));
      }
    } catch (error) {
      console.error("Error: fetchUsers action");
    }
  };
};
