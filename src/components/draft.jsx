import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  gender: Yup.string().oneOf(["man", "woman"], "Please select a valid gender"),
  name: Yup.string().max(32, "Name can't be longer than 32 characters!"),
  email: Yup.string()
    .email("Please enter a valid email!")
    .required("Email is required!"),
  oldPassword: Yup.string()
    .min(8, "Password must be at least 8 characters!")
    .max(64, "Password can't be longer than 64 characters!"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters!")
    .max(64, "Password can't be longer than 64 characters!"),
  repeatPassword: Yup.string().oneOf(
    [Yup.ref("password")],
    "Passwords must match!"
  ),
}).test(
  "passwords-check",
  "If any password field is filled, all password fields must be filled",
  function (values) {
    const { oldPassword, password, repeatPassword } = values;

    const isAnyPasswordFilled = oldPassword || password || repeatPassword;
    const areAllPasswordsFilled = oldPassword && password && repeatPassword;

    if (isAnyPasswordFilled && !areAllPasswordsFilled) {
      return false; // Викидаємо помилку
    }
    return true; // Все гаразд
  }
);

const MyForm = () => {
  return (
    <Formik
      initialValues={{
        gender: "",
        name: "",
        email: "",
        oldPassword: "",
        password: "",
        repeatPassword: "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log("Form values:", values);
      }}
    >
      {({ errors, touched }) => (
        <Form>
          {/* Gender */}
          <div>
            <label>
              <Field type="radio" name="gender" value="woman" />
              Woman
            </label>
            <label>
              <Field type="radio" name="gender" value="man" />
              Man
            </label>
          </div>

          {/* Name */}
          <div>
            <label>Your name</label>
            <Field name="name" placeholder="Name" />
            <ErrorMessage name="name" component="div" className="error" />
          </div>

          {/* Email */}
          <div>
            <label>
              <strong>E-mail</strong>
            </label>
            <Field name="email" placeholder="Email" />
            <ErrorMessage name="email" component="div" className="error" />
          </div>

          {/* Password Fields */}
          <div>
            <label>
              <strong>Password</strong>
            </label>
            <div>
              <label>Outdated password:</label>
              <Field
                type="password"
                name="oldPassword"
                placeholder="Password"
              />
              <ErrorMessage
                name="oldPassword"
                component="div"
                className="error"
              />
            </div>
            <div>
              <label>New Password:</label>
              <Field type="password" name="password" placeholder="Password" />
              <ErrorMessage name="password" component="div" className="error" />
            </div>
            <div>
              <label>Repeat new password:</label>
              <Field
                type="password"
                name="repeatPassword"
                placeholder="Password"
              />
              <ErrorMessage
                name="repeatPassword"
                component="div"
                className="error"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit">Save</button>
        </Form>
      )}
    </Formik>
  );
};

export default MyForm;
