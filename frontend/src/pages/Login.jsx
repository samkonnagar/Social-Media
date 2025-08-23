import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ErrorPop from "../utils/ErrorPop";
import { errorObj } from "../context/errorContext/errorContext";
import { userSignIn } from "../api/auth.js";

export default function Login() {
  const { isError, errMessage, errType, errorDispatch } = errorObj();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = () => {
    if (data.email !== "" && data.password !== "") {
      userSignIn(data)
        .then((res) => res.data)
        .then((data) => console.log(data))
        .catch((err) => console.warn(err));
    } else {
      errorDispatch({
        type: "SET_ERROR",
        payload: { message: "Enter email and password", type: "warning" },
      });
    }
  };

  useEffect(() => {
    if (isError) {
      setTimeout(
        () =>
          errorDispatch({
            type: "CLEAR_ERROR",
          }),
        5000
      );
    }
  }, [isError]);

  return (
    <>
      {isError && <ErrorPop message={errMessage} type={errType} />}
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-700">
        <div className="bg-white rounded-lg shadow p-8 w-full max-w-md">
          <h2 className="text-2xl font-semibold mb-6">Welcome back</h2>
          <input
            className="w-full mb-3 p-3 border rounded"
            placeholder="Email"
            name="email"
            value={data.email}
            onChange={handleChange}
          />
          <input
            className="w-full mb-3 p-3 border rounded"
            placeholder="Password"
            type="password"
            name="password"
            value={data.password}
            onChange={handleChange}
          />
          <button
            className="w-full py-3 bg-blue-600 text-white rounded"
            onClick={handleLogin}
          >
            Login
          </button>
          <p className="mt-4 text-center text-sm">
            Don't have an account?{" "}
            <Link to="/signup" className="text-indigo-600">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
