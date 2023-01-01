import Validator from "../Validator";

const updateUserValidation = (formData) => {
  const validator = new Validator(formData);

  const validatorErrors = validator
    .setValidation({
      firstName: ["required", "min:3", "max:10"],
      lastName: ["required", "min:3", "max:10"],
      username: ["required", "min:3", "max:10"],
      email: ["required", "email"],
      phone: ["required", "min:11", "max:11"],
      photo: ["image:jpeg,png ", "size:2048"],
      role: ["required", "enum:user,admin"],
      status: ["required", "enum:1,2,3"],
    })
    .setMessages({
      firstName: {
        required: "first name is required",
        min: "first name must be grater than 3 characters.",
        max: "first name must be less than 10 characters.",
      },
      lastName: {
        required: "last name is required",
      },
      username: {
        required: "username is required",
        min: "username must be grater than 3 characters.",
        max: "username must be less than 10 characters.",
      },
      email: {
        required: "email is required",
        email: "please provide a valid email.",
      },
      phone: {
        required: "phone is required",
        min: "phone must be grater than 11 characters.",
        max: "phone must be less than 11 characters.",
      },
      photo: {
        image: "Please provide a valid image (jpg, jpeg, png).",
        size: "Max size is 2048KB.",
      },
      role: {
        required: "role is required",
        enum: "role value must be in (user, admin)",
      },
      status: {
        required: "status is required",
        enum: "status value must be in (active, disabled, banned)",
      },
    })
    .prepare()
    .getObjectErrors();

  console.log(validatorErrors);

  return validatorErrors;
};

export default updateUserValidation;
