export const CLOSE_DELETE_MODAL = "CLOSE_DELETE_MODAL";
export const SHOW_DELETE_MODAL = "SHOW_DELETE_MODAL";

export const closeDeleteModal = () => {
  return {
    type: CLOSE_DELETE_MODAL,
  };
};

export const showDeleteModal = (data) => {
  return {
    type: SHOW_DELETE_MODAL,
    payload: {
      show: true,
      data,
    },
  };
};
