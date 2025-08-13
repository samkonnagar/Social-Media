import React, { useState } from "react";
import Composer from "../components/Composer";
import PostCard from "../components/PostCard";
import { posts as initialPosts } from "../data/posts";

export default function Feed() {
  const [posts, setPosts] = useState(initialPosts);

  function addPost(npost) {
    setPosts((p) => [npost, ...p]);
  }

  return (
    <>
      <Composer onCreate={addPost} />
      {posts.map((p) => (
        <PostCard key={p.id} post={p} />
      ))}
    </>
  );
}
