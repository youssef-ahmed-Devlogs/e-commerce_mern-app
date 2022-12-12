import axios from "axios";
import { toast } from "react-toastify";

export const GET_USERS = "GET_USERS";
export const DELETE_USER = "DELETE_USERS";

const BASE_URL = "/api/v1";
const URL = `${BASE_URL}/users`;

const getOptions = () => {
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

export const getUsers = (users) => {
  return {
    type: GET_USERS,
    payload: users,
  };
};

export const deleteUser = (user) => {};

export const fetchUsers = (queries = "") => {
  return async (dispatch) => {
    const options = getOptions();

    try {
      if (options !== "noToken") {
        const { data } = await axios.get(`${URL}?${queries}`, options);
        dispatch(getUsers(data));
      }
    } catch (error) {
      console.error("Error: fetchUsers action");
    }
  };
};

export const createUser = (formData, navigate) => {
  return async (dispatch) => {
    const options = getOptions();

    try {
      if (options !== "noToken") {
        const { data } = await axios.post(URL, formData, options);
        toast.success(`User ${data.data.username} created successfully`);

        const siteSettings = localStorage.getItem("siteSettings")
          ? JSON.parse(localStorage.getItem("siteSettings"))
          : {};

        if (siteSettings && siteSettings.backAfterSubmit) {
          navigate("/users");
        }
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      }
      console.error("Error: createUser action");
    }
  };
};
