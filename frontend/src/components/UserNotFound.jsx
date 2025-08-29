import React from "react";
import { useNavigate } from "react-router-dom";

export default function UserNotFound() {
  const navigate = useNavigate();
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 flex gap-5 sm:gap-6 items-center w-full mx-auto">
      {/* Animated GIF */}
      <div className="shrink-0">
        <img
          src="https://media.giphy.com/media/3o7aD2saalBwwftBIY/giphy.gif"
          alt="User not found animation"
          className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl object-cover shadow-md ring-1 ring-black/5 animate-[float_3s_ease-in-out_infinite]"
        />
      </div>

      {/* Text content */}
      <div className="min-w-0">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
          User not found
        </h2>
        <p className="mt-1 text-sm sm:text-base text-slate-600">
          We couldn’t locate a user with those details.
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <button
            className="text-sm font-medium text-indigo-600 hover:underline "
            onClick={() => navigate("/")}
          >
            Back to home
          </button>
        </div>
      </div>

      {/* keyframes for floating GIF */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) }
          50% { transform: translateY(-6px) }
        }
      `}</style>
    </div>
  );
}
