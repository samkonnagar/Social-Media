import React from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import SidebarLeft from "../components/SidebarLeft";
import SidebarRight from "../components/SidebarRight";
import ProfileHeader from "../components/ProfileHeader";
import { users } from "../data/users";
import { posts } from "../data/posts";

export default function Profile() {
  const { id } = useParams();
  const user = users.find((u) => u.id === id) || users[0];
  const userPosts = posts.filter((p) => p.authorId === user.id);

  return (
    <>
      <ProfileHeader user={user} />
      <div className="bg-white rounded-md shadow p-4">
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
      </div>
    </>
  );
}
