import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProfileHeader from "../components/ProfileHeader";
import Composer from "../components/Composer";
import { dataObj } from "../context/authContext/AuthContext";
import { getUserDetails } from "../api/auth";
import UserNotFound from "../components/UserNotFound";

export default function Profile() {
  const { user } = dataObj();
  const { id } = useParams();
  const [userObj, setUserObj] = useState(null);
  const [userFound, setUserFound] = useState(false);

  useEffect(() => {
    if (id === user?._id) {
      user.isOwnProfile = true;
      setUserObj(user);
      setUserFound(true)
    } else {
      getUserDetails(id)
        .then((res) => res.data)
        .then((data) => {
          const user = data?.data?.user;
          user.isOwnProfile = false;
          setUserObj(user);
          setUserFound(true)
        })
        .catch((err) => {
          setUserObj(null);
          setUserFound(false)
        });
    }
  }, [id]);

  return (
    <>
      {userObj && <ProfileHeader user={userObj} />}
      {userObj?.isOwnProfile && <Composer />}
      {!userFound && <UserNotFound />}
      {/* <div className="bg-white rounded-md shadow p-4">
        <h3 className="font-semibold mb-4">Posts</h3>
        <div className="grid grid-cols-3 gap-3">
          {userPosts.length === 0 && (
            <div className="text-gray-500">No posts yet</div>
          )}
          {userPosts.map((p) => (
            <img
              key={p.id}
              src={p.images[0]}
              alt=""
              className="h-36 w-full object-cover rounded cursor-pointer"
            />
          ))}
        </div>
      </div> */}
    </>
  );
}
