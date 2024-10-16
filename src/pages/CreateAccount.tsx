import { useFormik } from "formik";
import { NavLink } from "react-router-dom";
import { Button, Input } from "../components";
import { createAccountValidator } from "../validators";

export const CreateAccount = () => {
  const initialValues = {
    userName: "",
    firstName: "",
    lastName: "",
    email: "",
    occupation: "",
    password: "",
  };

  const { errors, touched, handleChange, handleSubmit, handleBlur } = useFormik(
    {
      initialValues,
      validationSchema: createAccountValidator,
      onSubmit: (values) => {
        console.log("current values", values);
      },
    }
  );

  return (
    <div
      className="xl:w-1/2 mx-auto bg-gradient-to-tl rounded-lg 
     to-slate-800  from-bg-slate-900 px-5 md:p-5 bg-opacity-70"
    >
      <h1 className="text-3xl font-bold">Create Account</h1>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <div className="md:flex gap-3 py-2 md:py-4 ">
          <div className="flex-1 space-y-2 md:space-y-5">
            <Input
              label="Username"
              type="text"
              errorMessage={touched.userName ? errors.userName : ""}
              name={Object.keys(initialValues)[0]}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <Input
              label="First Name"
              type="text"
              errorMessage={touched.firstName ? errors.firstName : ""}
              name={Object.keys(initialValues)[1]}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <Input
              label="Last Name"
              type="text"
              errorMessage={touched.lastName ? errors.lastName : ""}
              name={Object.keys(initialValues)[2]}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>
          <div className="flex-1 space-y-2 md:space-y-5">
            <Input
              label="Email"
              type="text"
              errorMessage={touched.email ? errors.email : ""}
              name={Object.keys(initialValues)[3]}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <Input
              label="Occupation"
              type="text"
              errorMessage={errors.occupation ? errors.occupation : ""}
              name={Object.keys(initialValues)[4]}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <Input
              label="Password"
              type="password"
              errorMessage={errors.password ? errors.password : ""}
              name={Object.keys(initialValues)[5]}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>
        </div>
        <Button label="Sign up" variant="secondary" styleClass="lg:w-1/2" />
        <p className="text-sm text-opacity-70 lg: mt-2 text-slate-50 ">
          Already created account{" "}
          <NavLink className="underline text-blue-400" to="/login">
            Sign in
          </NavLink>
          .
        </p>
      </form>
    </div>
  );
};
