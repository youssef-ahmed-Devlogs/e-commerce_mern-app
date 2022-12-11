export const CLOSE_CONFIRM_MODAL = "CLOSE_CONFIRM_MODAL";
export const SHOW_CONFIRM_MODAL = "SHOW_CONFIRM_MODAL";

export const closeConfirmModal = () => {
  return {
    type: CLOSE_CONFIRM_MODAL,
    payload: false,
  };
};

export const showConfirmModal = () => {
  return {
    type: SHOW_CONFIRM_MODAL,
    payload: true,
  };
};
