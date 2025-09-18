import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProfileHeader from "../components/ProfileHeader";
import Composer from "../components/Composer";
import { dataObj } from "../context/authContext/AuthContext";
import { getUserDetails } from "../api/auth";
import UserNotFound from "../components/UserNotFound";
import PostCard from "../components/PostCard";
import { getPost } from "../api/post.js";
import NoPostsCard from "../components/NoPostsCard.jsx";

export default function Profile() {
  const { user } = dataObj();
  const { id } = useParams();
  const [userObj, setUserObj] = useState(null);
  const [userFound, setUserFound] = useState(false);
  const [posts, setPosts] = useState({
    data: [],
    isFetching: true,
    noOfPost: 0,
  });

  const fetchPost = (id) => {
    setPosts((p) => ({ ...p, isFetching: true }));
    getPost(id)
      .then((res) => res?.data?.data)
      .then((data) => {
        setPosts({ isFetching: false, data: data, noOfPost: data.length });
      });
  };

  useEffect(() => {
    if (id === user?._id) {
      user.isOwnProfile = true;
      setUserObj(user);
      setUserFound(true);
    } else {
      getUserDetails(id)
        .then((res) => res.data)
        .then((data) => {
          const user = data?.data?.user;
          user.isOwnProfile = false;
          setUserObj(user);
          setUserFound(true);
        })
        .catch((err) => {
          setUserObj(null);
          setUserFound(false);
        });
    }
    fetchPost(id);
  }, [id]);

  return (
    <>
      {userObj && <ProfileHeader user={userObj} noOfPost={posts.noOfPost} />}
      {userObj?.isOwnProfile && <Composer setPosts={setPosts} />}
      {!userFound && <UserNotFound />}
      {posts.noOfPost > 0 &&
        posts.data.map((post) => (
          <div className="bg-white rounded-md shadow p-4 mb-3" key={post._id}>
            <PostCard post={post} currUser={user} />
          </div>
        ))}
      {!posts.isFetching && posts.noOfPost === 0 && <NoPostsCard />}
    </>
  );
}
