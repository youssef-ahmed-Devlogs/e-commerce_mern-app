import axios from "axios";

export const GET_USERS = "GET_USERS";
export const ADD_USER = "ADD_USERS";
export const DELETE_USER = "DELETE_USERS";

export const getUsers = (users) => {
  return {
    type: GET_USERS,
    payload: users,
  };
};

const URL = "/api/v1/users";

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
      const { data } = await axios.get(`${URL}?${queries}`, options);
      dispatch(getUsers(data));
    } catch (error) {
      console.log("====================================");
      console.log(error);
      console.log("====================================");
    }
  };
};
