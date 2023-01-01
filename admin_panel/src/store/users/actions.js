import axios from "axios";
import { toast } from "react-toastify";

export const GET_USERS = "GET_USERS";

const URL = `${process.env.REACT_APP_API_URL}/users`;

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

export const getUsers = (users) => {
  return {
    type: GET_USERS,
    payload: users,
  };
};

export const fetchUsers = (queries = "") => {
  return async (dispatch) => {
    const api_options = apiOptions();

    try {
      if (api_options !== "noToken") {
        const { data } = await axios.get(`${URL}?${queries}`, api_options);
        dispatch(getUsers(data));
      }
    } catch (error) {
      console.error("Error: fetchUsers action");
    }
  };
};

export const createUser = (formData, options) => {
  return async (dispatch) => {
    const { navigate, setUploadProgress } = options;
    const api_options = apiOptions();

    try {
      if (api_options !== "noToken") {
        const formDataObj = new FormData();

        for (let key in formData) {
          if (formData[key] === "") {
            continue;
          }
          formDataObj.append(key, formData[key]);
        }

        const { data } = await axios.post(URL, formDataObj, {
          ...api_options,
          onUploadProgress: (progressEvent) => {
            if (formData.photo) {
              const progressNow = Math.round(
                (progressEvent.loaded / progressEvent.total) * 100
              ); // (200 / 400 * 100) = 50%
              setUploadProgress(progressNow);

              if (progressNow === 100) {
                setTimeout(() => {
                  setUploadProgress(0);
                }, 1000);
              }
            }
          },
        });

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

      console.log("====================================");
      console.log(error);
      console.log("====================================");
      console.error("Error: createUser action");
    }
  };
};

export const updateUser = (userId, options) => {
  return async (dispatch) => {
    const { formData, navigate, setUploadProgress, update } = options;
    const api_options = apiOptions();

    try {
      if (api_options !== "noToken") {
        const formDataObj = new FormData();

        for (let key in formData) {
          if (formData[key] === "") {
            continue;
          }
          formDataObj.append(key, formData[key]);
        }

        const { data } = await axios.patch(`${URL}/${userId}`, formDataObj, {
          ...api_options,
          onUploadProgress: (progressEvent) => {
            if (formData.photo) {
              const progressNow = Math.round(
                (progressEvent.loaded / progressEvent.total) * 100
              ); // (200 / 400 * 100) = 50%

              setUploadProgress(progressNow);

              if (progressNow === 100) {
                setTimeout(() => {
                  setUploadProgress(0);
                }, 1000);
              }
            }
          },
        });

        // Run update function after fetch
        if (update) update();

        toast.success(`User ${data.data.username} updated successfully`);

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

      console.log("====================================");
      console.log(error);
      console.log("====================================");
      console.error("Error: updateUser action");
    }
  };
};

export const updateUserPassword = (userId, options) => {
  return async (dispatch) => {
    const { update } = options;
    const { password, passwordConfirm } = options.formData;
    const api_options = apiOptions();

    try {
      const { data } = await axios.patch(
        `${URL}/${userId}/updatePassword`,
        { password, passwordConfirm },
        { ...api_options }
      );

      toast.success(`User ${data.data.username} password updated successfully`);

      // Run update function after request finish
      if (update) update();
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      }

      console.log("====================================");
      console.log(error);
      console.log("====================================");
      console.error("Error: updateUserPassword action");
    }
  };
};
