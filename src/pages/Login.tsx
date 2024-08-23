import { useFormik } from "formik";

export const Login = () => {
  const initialValues = {
    password: "",
    email: "",
  };
  const { handleChange, errors, values } = useFormik({
    initialValues,
    onSubmit: () => {},
  });

  return (
    <div className="mx-auto md:max-w-1/2 sm:w-1/2 px-4">
      <h2 className="text-3xl">Sign In</h2>
      <form></form>
    </div>
  );
};
