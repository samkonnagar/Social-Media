import React from "react";
import { Link} from "react-router-dom";

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-700">
      <div className="bg-white rounded-lg shadow p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6">Welcome back</h2>
        <input className="w-full mb-3 p-3 border rounded" placeholder="Email" />
        <input
          className="w-full mb-3 p-3 border rounded"
          placeholder="Password"
          type="password"
        />
        <button
          className="w-full py-3 bg-blue-600 text-white rounded"
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
  );
}
