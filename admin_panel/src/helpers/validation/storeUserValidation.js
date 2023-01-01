import Validator from "../Validator";

const storeUserValidation = (formData) => {
  const validator = new Validator(formData);

  const validatorErrors = validator
    .setValidation({
      firstName: ["required", "min:3", "max:10"],
      lastName: ["required", "min:3", "max:10"],
      username: ["required", "min:3", "max:10"],
      email: ["required", "email"],
      password: ["required", "min:8", "max:50"],
      passwordConfirm: ["required", "min:8", "max:50"],
      phone: ["required", "min:11", "max:11"],
      photo: ["image:jpeg,png", "size:1000"],
      role: ["required", "enum:2,4,2"],
      status: ["required", "enum:2,1,4"],
    })
    .setMessages({
      firstName: {
        require: "first name is required",
        min: "first name must be grater than 8 characters.",
        max: "first name must be less than 10 characters.",
      },
      lastName: {
        require: "last name is required",
      },
      username: {
        require: "username is required",
      },
      email: {
        require: "email is required",
        email: "please provide a valid email.",
      },
      password: {
        require: "password is required",
      },
      passwordConfirm: {
        require: "password confirm is required",
      },
      phone: { require: "phone is required" },
      photo: { require: "last name is required" },
      role: { require: "role is required" },
      status: { require: "status is required" },
    })
    .prepare()
    .getObjectErrors();

  return validatorErrors;
};

export default storeUserValidation;
