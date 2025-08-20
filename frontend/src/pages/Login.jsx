import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ErrorPop from "../utils/ErrorPop";

export default function Login() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  
  const [error, setError] = useState({
    isError: false,
    message: "",
    type: "",
  });

  console.log(data);

  const handleChange = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = () => {
    if (data.email !== "" && data.password !== "") {
    } else {
      setError({
        message: "Please Enter Email and Password",
        type: "warning",
        isError: true,
      });
    }
  };

  useEffect(() => {
    if (error.isError) {
      setTimeout(() => setError({ message: "", type: "", isError: false }), 5000);
    }
  }, [error]);

  return (
    <>
      {error.isError && <ErrorPop error={error} />}
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
