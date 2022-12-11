import axios from "axios";

export const LOGIN = "LOGIN";
export const UPDATE_STATE = "UPDATE_STATE";
export const RESET_STATE = "RESET_STATE";

export const updateState = (state) => {
  return {
    type: UPDATE_STATE,
    payload: state,
  };
};

export const resetState = () => {
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

const URL = "/api/v1/users";

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
        user: data,
        isSuccess: true,
        message: "You are logged in successfully",
        isLoading: false,
        isError: false,
      };

      localStorage.setItem("user", JSON.stringify(data));
      dispatch(updateState(updatedState));
    } catch (error) {
      if (error.response) {
        const updatedState = {
          user: {},
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
          user: {},
          isSuccess: true,
          message: data.message,
          isError: false,
          isLoading: false,
        };

        localStorage.removeItem("user");
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
      console.log(error);
    }
  };
};

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
          localStorage.removeItem("user");
          return dispatch(updateState({ user: {} }));
        }

        localStorage.setItem(
          "user",
          JSON.stringify({ ...data, token: loggedInUser.token })
        );

        const updatedState = {
          user: data.data ? { ...data, token: loggedInUser.token } : {},
        };

        dispatch(updateState(updatedState));
      }
    } catch (error) {
      localStorage.removeItem("user");
      const updatedState = {
        user: {},
      };

      dispatch(updateState(updatedState));
    }
  };
};
