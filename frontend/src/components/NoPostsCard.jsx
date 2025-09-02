import React from "react";
import { useNavigate } from "react-router-dom";

export default function NoPostsCard() {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 flex gap-5 sm:gap-6 items-center w-full mx-auto">
      {/* Animated GIF */}
      <div className="shrink-0">
        <img
          src="https://media.giphy.com/media/9J7tdYltWyXIY/giphy.gif"
          alt="No posts animation"
          className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl object-cover shadow-md ring-1 ring-black/5 animate-[float_3s_ease-in-out_infinite]"
        />
      </div>

      {/* Text content */}
      <div className="min-w-0">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
          No posts added yet
        </h2>
        <p className="mt-1 text-sm sm:text-base text-slate-600">
          Looks like you haven’t shared anything. Start by adding your first
          post!
        </p>
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
