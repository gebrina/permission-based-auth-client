import { useFormik } from "formik";
import { NavLink } from "react-router-dom";
import { Button, Input } from "../components";
import { loginFormValidator } from "../validators";

export const Login = () => {
  const initialValues = {
    email: "",
    password: "",
  };

  const { handleChange, errors, touched, handleSubmit, handleBlur } = useFormik(
    {
      initialValues,
      validationSchema: loginFormValidator,
      onSubmit: () => {},
    }
  );

  return (
    <div className="mx-auto mt-10 bg-gradient-to-bl  from-bg-slate-900 bg-opacity-70 p-5 sm:w-[75%] md:w-1/2 lg:w-1/3">
      <h2 className="text-3xl">Sign In</h2>
      <form
        role="form"
        className="my-3 flex flex-col gap-3"
        onSubmit={handleSubmit}
      >
        <Input
          type="text"
          name={Object.keys(initialValues)[0]}
          label="Email"
          errorMessage={touched.email ? errors.email : ""}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <Input
          type="password"
          name={Object.keys(initialValues)[1]}
          label="Password"
          errorMessage={touched.password ? errors.password : ""}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <Button label="Login" variant="teritiary" />
      </form>
      <p className="text-sm text-opacity-80 text-slate-300">
        Don't have an account{" "}
        <NavLink className="underline text-blue-400" to="/create-account">
          Sign Up
        </NavLink>
        .
      </p>
    </div>
  );
};
