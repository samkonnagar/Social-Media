import React, { useEffect, useState } from "react";
import Composer from "../components/Composer";
import PostCard from "../components/PostCard";
import { dataObj } from "../context/authContext/AuthContext";
import Loader from "../components/Loader";
import { getFeed } from "../api/post";
import InfiniteScroll from "react-infinite-scroll-component";

export default function Feed() {
  const { user } = dataObj();
  const [posts, setPosts] = useState({
    data: [],
    isFetching: true,
    isNotlast: true,
  });
  const [page, setPage] = useState(0);

  const fetchPost = (num = null) => {
    num = page === 0 ? null : page;
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
  }, [page]);

  return (
    <>
      <Composer setPosts={setPosts} />
      <InfiniteScroll
        dataLength={posts.data.length}
        next={() => setPage((prev) => prev + 1)}
        hasMore={posts.isNotlast}
        loader={<h4 className="text-center text-white">Loading more...</h4>}
        endMessage={
          <p className="text-center text-white">🎉 You reached the end!</p>
        }
      >
        {posts?.data.map((post) => (
          <PostCard post={post} currUser={user} key={post?._id} />
        ))}
      </InfiniteScroll>
      {posts?.isFetching && <Loader />}
    </>
  );
}
