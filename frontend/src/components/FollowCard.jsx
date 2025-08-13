import React from "react";
import { Link } from "react-router-dom";

export default function FollowCard({ user }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <img src={user.avatar} className="h-10 w-10 rounded-full" alt="" />
        <div>
          <Link to={`/profile/${user.id}`} className="font-medium">
            {user.name}
          </Link>
          <div className="text-sm text-gray-500">@{user.handle}</div>
        </div>
      </div>
      <button className="px-3 py-1 bg-purple-600 text-white rounded">
        Follow
      </button>
    </div>
  );
}
