import axios from "axios";
import { toast } from "react-toastify";

export const GET_PRODUCTS = "GET_PRODUCTS";

const URL = `${process.env.REACT_APP_API_URL}/products`;

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

export const getProducts = (products) => {
  return {
    type: GET_PRODUCTS,
    payload: products,
  };
};

export const fetchProducts = (queries = "") => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${URL}?${queries}`, apiOptions());

      dispatch(getProducts(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const createProduct = (formData, options) => {
  return async (dispatch) => {
    try {
      const { navigate, setUploadProgress } = options;
      const formDataObj = new FormData();

      for (let key in formData) {
        formDataObj.append(key, formData[key]);
      }

      if (!formData.images.length) {
        formDataObj.delete("images");
      }

      const { data } = await axios.post(URL, formDataObj, {
        ...apiOptions(),
        onUploadProgress: (progressEvent) => {
          if (formData.images.length) {
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

      toast.success(`Product ${data.data.title} created successfully`);

      const siteSettings = localStorage.getItem("siteSettings")
        ? JSON.parse(localStorage.getItem("siteSettings"))
        : {};

      if (siteSettings && siteSettings.backAfterSubmit) {
        navigate("/products");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      }

      console.log(error.response.data.validationMessages);

      console.error("Error: createProduct action");
    }
  };
};

export const updateCategory = (categoryId, options) => {
  return async (dispatch) => {
    try {
      const { formData, navigate, setUploadProgress, update } = options;
      const api_options = apiOptions();
      const formDataObj = new FormData();

      for (let key in formData) {
        formDataObj.append(key, formData[key]);
      }

      if (!formData.cover) {
        formDataObj.delete("cover");
      }

      const { data } = await axios.patch(`${URL}/${categoryId}`, formDataObj, {
        ...api_options,
        onUploadProgress: (progressEvent) => {
          if (formData.cover) {
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

      toast.success(`User ${data.data.title} updated successfully`);

      const siteSettings = localStorage.getItem("siteSettings")
        ? JSON.parse(localStorage.getItem("siteSettings"))
        : {};

      if (siteSettings && siteSettings.backAfterSubmit) {
        navigate("/users");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      }

      console.log(error.response.data);
      console.error("Error: updateUser action");
    }
  };
};
