import React from "react";
import { useDispatch } from "react-redux";
import { login } from "../features/userSlice";
import { useNavigate, Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";

const LoginSchema = Yup.object().shape({
  username: Yup.string().required("Required"),
  password: Yup.string().required("Required"),
});

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (values) => {
    const credentials = JSON.parse(localStorage.getItem("credentials"));
    if (
      credentials &&
      credentials.username === values.username &&
      credentials.password === values.password
    ) {
      dispatch(login(credentials));
      toast.success("Logged in successfully!");
      navigate("/");
    } else {
      toast.error("Invalid credentials");
    }
  };

  const handleForgotPassword = () => {
    const credentials = JSON.parse(localStorage.getItem("credentials"));
    if (credentials?.password) {
      toast(`Your password is: ${credentials.password}`);
    } else {
      toast.error("No account found.");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow mt-10">
      <h1 className="text-2xl font-bold mb-4">Log In</h1>
      <Formik
        initialValues={{ username: "", password: "" }}
        validationSchema={LoginSchema}
        onSubmit={handleLogin}
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
          <button
            type="submit"
            className="bg-yellow-500 text-gray-900 px-4 py-2 rounded hover:bg-yellow-600 w-full"
          >
            Log In
          </button>
          <div className="flex justify-between mt-4 text-sm">
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-blue-600 hover:underline"
            >
              Forgot password?
            </button>
            <span>
              Don’t have an account?{" "}
              <Link to="/signup" className="text-blue-600 hover:underline">
                Sign up
              </Link>
            </span>
          </div>
        </Form>
      </Formik>
    </div>
  );
}

export default LoginPage;
