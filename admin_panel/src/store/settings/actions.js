export const BACK_AFTER_SUBMIT = "BACK_AFTER_SUBMIT";

export const handleBackAuto = (boolVal) => {
  return {
    type: BACK_AFTER_SUBMIT,
    payload: {
      backAfterSubmit: boolVal,
    },
  };
};
