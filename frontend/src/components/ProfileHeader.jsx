import React from "react";
import { useNavigate } from "react-router-dom";

export default function ProfileHeader({ user }) {
  const navigate = useNavigate();
  return (
    <div className="bg-white rounded-md shadow overflow-hidden relative mb-2">
      <div
        className="profile-cover absolute top-0 left-0 w-full h-28"
        style={{
          backgroundImage: `url(${user.cover || "/cover.jpg"})`,
        }}
      />
      <div className="px-6 pb-6 mt-12 relative z-10">
        <div className="flex items-end justify-between">
          <div className="flex items-end gap-4">
            <img
              src={user.avatar}
              alt=""
              className="h-28 w-28 rounded-full border-4 border-white shadow"
            />
            <div>
              <h2 className="text-2xl font-semibold">{user.name}</h2>
              <div className="text-sm text-gray-500">@{user.handle}</div>
              <p className="mt-2 text-sm text-gray-700 max-w-xl">{user.bio}</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="px-2 cursor-pointer py-1 text-sm bg-purple-600 text-white rounded">
              Follow
            </button>
            <button className="px-2 cursor-pointer py-1 text-sm border rounded">Message</button>
          </div>
        </div>

        <div className="mt-4 flex gap-6">
          <div>
            <div className="font-semibold text-lg">{user.posts}</div>
            <div className="text-sm text-gray-500">Posts</div>
          </div>
          <div>
            <div className="font-semibold text-lg">{user.followers}</div>
            <div className="text-sm text-gray-500">Followers</div>
          </div>
          <div>
            <div className="font-semibold text-lg">{user.following}</div>
            <div className="text-sm text-gray-500">Following</div>
          </div>
        </div>
      </div>
    </div>
  );
}
