import * as yup from "yup";

export const loginFormValidator = yup.object().shape({
  email: yup
    .string()
    .required("Enter your email address.")
    .email("Invalid email address."),
  password: yup
    .string()
    .min(5, "Your password must have atleast 5 chars.")
    .max(8, "Your password must be 8 characters long.")
    .required("Password is required."),
});
