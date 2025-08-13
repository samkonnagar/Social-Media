import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  return (
    <header className="w-full bg-white dark:bg-gray-900 shadow sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2"
          >
            <img
              src="/src/assets/logo.png"
              alt="logo"
              className="h-8 w-8 rounded"
            />
            <span className="font-semibold text-lg hidden md:inline">
              MySocial
            </span>
          </button>
          <div className="hidden md:flex items-center bg-gray-100 rounded-full px-3 py-1 gap-2">
            <input
              className="bg-transparent outline-none text-sm w-64"
              placeholder="Search"
            />
          </div>
        </div>

        <nav className="flex items-center gap-4">
          <Link
            to="/"
            className="hidden md:inline px-3 py-2 rounded hover:bg-gray-100"
          >
            Home
          </Link>
          <Link to="/profile/u1" className="flex items-center gap-2">
            <img
              src="/src/assets/default-avatar.jpg"
              className="h-8 w-8 rounded-full border"
              alt="me"
            />
          </Link>
        </nav>
      </div>
    </header>
  );
}
