import axios from "axios";

const BASE_URL = "/api/v1";
const URL = `${BASE_URL}/users`;

export const LOGIN = "LOGIN";
export const UPDATE_STATE = "UPDATE_STATE";
export const SAVE_USER = "SAVE_USER";
export const DELETE_USER = "DELETE_USER";
export const RESET_STATE = "RESET_STATE";

export const saveUser = (user) => {
  return {
    type: SAVE_USER,
    payload: user,
  };
};

export const deleteUser = () => {
  return {
    type: DELETE_USER,
    payload: {},
  };
};

export const updateState = (state) => {
  return {
    type: UPDATE_STATE,
    payload: state,
  };
};

export const resetAuthState = () => {
  return {
    type: RESET_STATE,
    payload: {
      isLoading: false,
      isError: false,
      isSuccess: false,
      message: "",
    },
  };
};

export const login = (formData) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(`${URL}/login`, formData);
      delete data.status;
      delete data.data.accessTokens;

      if (data.data.role === "user") {
        const updatedState = {
          isError: true,
          message: "You are not an admin",
          isLoading: false,
          isSuccess: false,
        };

        return dispatch(updateState(updatedState));
      }

      const updatedState = {
        isSuccess: true,
        message: "You are logged in successfully",
        isLoading: false,
        isError: false,
      };

      dispatch(saveUser(data));
      dispatch(updateState(updatedState));
    } catch (error) {
      if (error.response) {
        const updatedState = {
          isError: true,
          message: error.response.data.message,
          isSuccess: false,
          isLoading: false,
        };

        dispatch(deleteUser());
        dispatch(updateState(updatedState));
      }
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    const loggedInUser = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : {};

    try {
      const options = {
        headers: {
          Authorization: `Bearer ${loggedInUser.token}`,
        },
      };
      const { data } = await axios.post(`${URL}/logout`, {}, options);

      if (data.status === "success") {
        const updatedState = {
          isSuccess: true,
          message: data.message,
          isError: false,
          isLoading: false,
        };

        dispatch(deleteUser());
        dispatch(updateState(updatedState));
      }
    } catch (error) {
      if (error.response) {
        const updatedState = {
          isError: true,
          message: error.response.data.message,
          isSuccess: false,
          isLoading: false,
        };
        dispatch(updateState(updatedState));
      }
    }
  };
};

/**
 * Listening any change in the current logged in user
 * If the token did change or expire or he no longer exists in the database for any reason, the user will be logout automatic
 * If any other data did change then will change in UI
 */
export const protect = () => {
  return async (dispatch) => {
    const loggedInUser = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : {};

    try {
      if (loggedInUser.token) {
        const options = {
          headers: {
            Authorization: `Bearer ${loggedInUser.token}`,
          },
        };
        const { data } = await axios.get(
          `${URL}/${loggedInUser.data.id}`,
          options
        );

        if (data.data.role === "user") {
          return dispatch(deleteUser());
        }

        const user = data.data ? { ...data, token: loggedInUser.token } : {};

        dispatch(saveUser(user));
      }
    } catch (error) {
      dispatch(deleteUser());
    }
  };
};
