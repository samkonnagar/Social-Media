import React, { useEffect, useState } from "react";
import Composer from "../components/Composer";
import PostCard from "../components/PostCard";
import { dataObj } from "../context/authContext/AuthContext";
import Loader from "../components/Loader";
import { getFeed } from "../api/post";

export default function Feed() {
  const { user } = dataObj();
  const [posts, setPosts] = useState({
    data: [],
    isFetching: true,
    isNotlast: true,
  });

  const fetchPost = (num = null) => {
    setPosts((prev) => ({ ...prev, isFetching: true }));
    getFeed(num)
      .then((res) => res?.data?.data)
      .then((data) => {
        setPosts((prev) => ({
          ...prev,
          isFetching: false,
          isNotlast: data.auto_avalable,
          data: [...prev.data, ...data.posts],
        }));
      });
  };

  useEffect(() => {
    if (posts.isNotlast) {
      fetchPost();
    }
  }, []);

  return (
    <>
      <Composer setPosts={setPosts}/>
      {posts?.data.map((post) => (
        <PostCard post={post} currUser={user} key={post?._id} />
      ))}
      {posts?.isFetching && <Loader />}
    </>
  );
}
