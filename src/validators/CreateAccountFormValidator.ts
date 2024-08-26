import * as yup from "yup";

export const createAccountValidator = yup.object().shape({
  userName: yup
    .string()
    .required("Username is required.")
    .min(5, "Username must have atleast 6 characters.")
    .max(8, "Username must have not more than 8 characters."),
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
