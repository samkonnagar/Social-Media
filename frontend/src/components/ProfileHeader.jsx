import React from "react";
import FollowBtn from "./FollowBtn";
import { dataObj } from "../context/authContext/AuthContext";

export default function ProfileHeader({ user, noOfPost }) {
  const { user: loggdinUser } = dataObj();
  const followObj = {
    isOwnProfile: loggdinUser._id === user._id,
    alreadyFollow: user.followers.includes(loggdinUser._id),
    userId: user._id,
  };
  
  return (
    <div className="bg-white rounded-md shadow overflow-hidden relative mb-2">
      <div
        className="profile-cover absolute top-0 left-0 w-full h-28"
        style={{
          backgroundImage: `url(${user?.cover || "/cover.jpg"})`,
        }}
      />
      <div className="px-6 pb-6 mt-12 relative z-10">
        <div className="flex items-end justify-between">
          <div className="flex items-end gap-4">
            <img
              src={user.avatar ?? "/dummy.png"}
              alt=""
              className="h-28 w-28 rounded-full border-4 border-white shadow"
            />
            <div>
              <h2 className="text-2xl font-semibold">{user.name}</h2>
              <p className="mt-2 text-sm text-gray-700 max-w-xl">{user.bio}</p>
            </div>
          </div>
          <div className="flex gap-3">
            <FollowBtn followObj={followObj} />
            <button className="px-2 cursor-pointer py-1 text-sm border rounded">
              Message
            </button>
          </div>
        </div>

        <div className="mt-4 flex gap-6">
          <div>
            <div className="font-semibold text-lg">{noOfPost}</div>
            <div className="text-sm text-gray-500">Posts</div>
          </div>
          <div>
            <div className="font-semibold text-lg">
              {user?.followers.length}
            </div>
            <div className="text-sm text-gray-500">Followers</div>
          </div>
          <div>
            <div className="font-semibold text-lg">
              {user?.following.length}
            </div>
            <div className="text-sm text-gray-500">Following</div>
          </div>
        </div>
      </div>
    </div>
  );
}
