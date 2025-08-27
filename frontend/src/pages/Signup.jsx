import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ErrorPop from "../utils/ErrorPop";
import { errorObj } from "../context/errorContext/errorContext";
import { userSignUp } from "../api/auth.js";
import { dataObj } from "../context/authContext/AuthContext.jsx";

export default function Signup() {
  const navigate = useNavigate();
  const { isError, errMessage, errType, errorDispatch } = errorObj();
  const { user, isFetching, dispatch } = dataObj();
  const [data, setData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSignup = () => {
    if (data.email !== "" && data.password !== "" && data.fullName !== "") {
      dispatch({
        type: "LOGIN_START",
      });
      userSignUp(data)
        .then((res) => res.data)
        .then((data) => {
          dispatch({
            type: "LOGIN_SUCCESS",
            payload: data?.data?.user,
          });
          errorDispatch({
            type: "SET_ERROR",
            payload: { message: data?.message, type: "success" },
          });
          navigate("/")
        })
        .catch((err) => {
          const msg = err.response?.data?.message;
          errorDispatch({
            type: "SET_ERROR",
            payload: { message: msg, type: "error" },
          });
        });
    } else {
      errorDispatch({
        type: "SET_ERROR",
        payload: { message: "Enter All Fields", type: "warning" },
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
          <h2 className="text-2xl font-semibold mb-6">Create account</h2>
          <input
            className="w-full mb-3 p-3 border rounded"
            placeholder="Full name"
            name="fullName"
            value={data.fullName}
            onChange={handleChange}
          />
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
            className="w-full py-3 bg-green-600 text-white rounded"
            onClick={handleSignup}
          >
            Sign up
          </button>
          <p className="mt-4 text-center text-sm">
            Already a member?{" "}
            <Link to="/" className="text-indigo-600">
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
