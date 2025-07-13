import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";

const SignupSchema = Yup.object().shape({
  username: Yup.string().required("Required"),
  password: Yup.string().min(4).required("Required"),
  address: Yup.string().required("Required"),
  phone: Yup.string().required("Required"),
});

function SignupPage() {
  const navigate = useNavigate();

  const handleSignup = (values) => {
    localStorage.setItem(
      "credentials",
      JSON.stringify({
        username: values.username,
        password: values.password,
        address: values.address,
        phone: values.phone,
      })
    );
    toast.success("Account created! You can now log in.");
    navigate("/login");
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow mt-10">
      <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
      <Formik
        initialValues={{
          username: "",
          password: "",
          address: "",
          phone: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={handleSignup}
      >
        <Form className="space-y-4">
          <div>
            <label className="block text-sm">Username</label>
            <Field
              name="username"
              className="w-full border p-2 rounded"
              autoComplete="off"
            />
            <ErrorMessage
              name="username"
              component="div"
              className="text-red-500 text-xs"
            />
          </div>
          <div>
            <label className="block text-sm">Password</label>
            <Field
              type="password"
              name="password"
              className="w-full border p-2 rounded"
            />
            <ErrorMessage
              name="password"
              component="div"
              className="text-red-500 text-xs"
            />
          </div>
          <div>
            <label className="block text-sm">Address</label>
            <Field
              name="address"
              className="w-full border p-2 rounded"
            />
            <ErrorMessage
              name="address"
              component="div"
              className="text-red-500 text-xs"
            />
          </div>
          <div>
            <label className="block text-sm">Phone</label>
            <Field
              name="phone"
              className="w-full border p-2 rounded"
            />
            <ErrorMessage
              name="phone"
              component="div"
              className="text-red-500 text-xs"
            />
          </div>
          <button
            type="submit"
            className="bg-yellow-500 text-gray-900 px-4 py-2 rounded hover:bg-yellow-600 w-full"
          >
            Sign Up
          </button>
          <div className="text-center mt-4 text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Log in
            </Link>
          </div>
        </Form>
      </Formik>
    </div>
  );
}

export default SignupPage;
