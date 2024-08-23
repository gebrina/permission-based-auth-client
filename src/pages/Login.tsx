import { useFormik } from "formik";
import { Button } from "../components/Button";
import { Input } from "../components/Input";

export const Login = () => {
  const initialValues = {
    password: "",
    email: "",
  };

  const { handleChange, errors, values, handleSubmit } = useFormik({
    initialValues,
    onSubmit: () => {},
  });

  return (
    <div className="mx-auto md:max-w-1/2 sm:w-1/2 px-4">
      <h2 className="text-3xl">Sign In</h2>
      <form className="bg-slate-400 sm:w-1/2" onSubmit={handleSubmit}>
        <Input
          type="text"
          value={values.email}
          onChange={handleChange}
          label="Email"
        />
        <Input
          type="password"
          value={values.password}
          onChange={handleChange}
          label="Password"
        />
        <Button onClick={() => {}} label="Login" variant="primary" />
      </form>
    </div>
  );
};
