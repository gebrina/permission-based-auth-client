import { useFormik } from "formik";
import { NavLink } from "react-router-dom";
import { Button } from "../components/Button";
import { Input } from "../components/Input";

export const Login = () => {
  const initialValues = {
    password: "",
    email: "",
  };

  const { handleChange, errors, handleSubmit } = useFormik({
    initialValues,
    onSubmit: () => {},
  });

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
          name={Object.keys(initialValues)[1]}
          onChange={handleChange}
          label="Email"
          errorMessage={errors.email}
        />
        <Input
          type="password"
          name={Object.keys(initialValues)[2]}
          onChange={handleChange}
          label="Password"
          errorMessage={errors.password}
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
