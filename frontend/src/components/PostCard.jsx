import React, { useState } from "react";
import { Heart, MessageSquare, Share2, ThumbsUp } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { users } from "../data/users.js";
import Slider from "../utils/Slider.jsx";

export default function PostCard({ post, currUser }) {
  const [liked, setLiked] = useState(false);
  const navigate = useNavigate();
  console.log(post);

  return (
    <article className="bg-white rounded-md shadow mb-6">
      <div className="p-4">
        {/* author */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={post?.author?.avatar ?? "/dummy.png"}
              className="h-10 w-10 rounded-full cursor-pointer"
              alt=""
              onClick={() => navigate(`/profile/${post?.author?._id}`)}
            />
            <div>
              <div className="font-semibold">{post?.author?.name}</div>
              <div className="text-sm text-gray-500">{post?.createdAt}</div>
            </div>
          </div>
          <button className="px-3 py-1 bg-purple-600 text-white rounded">
            Follow
          </button>
        </div>

        {/* media */}
        <div className="mt-3">
          {post?.postUrls.length === 1 ? (
            <img
              src={post.postUrls[0].url}
              className="w-full max-h-[480px] object-cover rounded"
              alt=""
            />
          ) : (
            <Slider files={post.postUrls.map((urlObj) => urlObj.url)} />
          )}
        </div>

        {/* caption */}
        {post?.caption && <p className="mt-3 text-sm">{post.caption}</p>}

        {/* actions */}
        <div className="mt-3 border-t pt-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2">
              <ThumbsUp size={16} className={liked ? "text-blue-600" : ""} />
              <span className="text-sm">
                {liked ? post?.likes.length + 1 : post?.likes.length}
              </span>
            </button>
            <button className="flex items-center gap-2">
              <MessageSquare size={16} />
              <span className="text-sm">{"#hii"}</span>
            </button>
            <button className="flex items-center gap-2">
              <Share2 size={16} />
            </button>
          </div>
          <div>
            <button className="text-sm text-gray-600">Save</button>
          </div>
        </div>

        {/* comment box */}
        <div className="mt-3 flex items-center gap-3">
          <img
            src={currUser?.avatar ?? "/dummy.png"}
            alt="user"
            className="h-8 w-8 rounded-full"
          />
          <input
            placeholder="Write a comment..."
            className="flex-1 rounded-full px-4 py-2 bg-gray-50 outline-none"
          />
          <button className="px-3 py-1 bg-blue-500 text-white rounded">
            Send
          </button>
        </div>
      </div>
    </article>
  );
}
