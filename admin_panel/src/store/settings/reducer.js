import { BACK_AFTER_SUBMIT } from "./actions";

const initialState = localStorage.getItem("siteSettings")
  ? JSON.parse(localStorage.getItem("siteSettings"))
  : {
      backAfterSubmit: false,
    };

export const settingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case BACK_AFTER_SUBMIT:
      const newSettings = { ...state, ...action.payload };
      localStorage.setItem("siteSettings", JSON.stringify(newSettings));

      return newSettings;
    default:
      return state;
  }
};
