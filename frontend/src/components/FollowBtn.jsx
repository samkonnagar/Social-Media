import React from "react";

function FollowBtn({ followObj }) {
  const { isOwnProfile, alreadyFollow, userId } = followObj;
  if (isOwnProfile) return;
  return alreadyFollow ? (
    <button className="px-3 cursor-pointer py-1 text-sm bg-purple-600 text-white rounded">
      Unfollow
    </button>
  ) : (
    <button className="px-3 cursor-pointer py-1 text-sm bg-purple-600 text-white rounded">
      Follow
    </button>
  );
}

export default FollowBtn;
