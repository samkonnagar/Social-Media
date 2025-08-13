import React from "react";
import { Link } from "react-router-dom";

export default function Signup() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-700">
      <div className="bg-white rounded-lg shadow p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6">Create account</h2>
        <input
          className="w-full mb-3 p-3 border rounded"
          placeholder="Full name"
        />
        <input className="w-full mb-3 p-3 border rounded" placeholder="Email" />
        <input
          className="w-full mb-3 p-3 border rounded"
          placeholder="Password"
          type="password"
        />
        <button className="w-full py-3 bg-green-600 text-white rounded">
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
  );
}
