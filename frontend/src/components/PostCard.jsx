import React, { useState } from "react";
import { Heart, MessageSquare, Share2, ThumbsUp } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function PostCard({ post }) {
  const [liked, setLiked] = useState(false);
  const navigate = useNavigate();

  return (
    <article className="bg-white rounded-md shadow mb-6">
      <div className="p-4">
        {/* author */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={post.authorAvatar}
              className="h-10 w-10 rounded-full cursor-pointer"
              alt=""
              onClick={() => navigate(`/profile/${post.authorId}`)}
            />
            <div>
              <div className="font-semibold">{post.authorName}</div>
              <div className="text-sm text-gray-500">{post.time}</div>
            </div>
          </div>
          <button className="px-3 py-1 bg-purple-600 text-white rounded">
            Follow
          </button>
        </div>

        {/* media */}
        <div className="mt-3">
          {post.images.length === 1 ? (
            <img
              src={post.images[0]}
              className="w-full max-h-[480px] object-cover rounded"
              alt=""
            />
          ) : (
            <div className="grid grid-cols-2 gap-2">
              {post.images.map((im, i) => (
                <img
                  key={i}
                  src={im}
                  className="h-48 w-full object-cover rounded"
                  alt=""
                />
              ))}
            </div>
          )}
        </div>

        {/* caption */}
        {post.caption && <p className="mt-3 text-sm">{post.caption}</p>}

        {/* actions */}
        <div className="mt-3 border-t pt-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setLiked(!liked)}
              className="flex items-center gap-2"
            >
              <ThumbsUp size={16} className={liked ? "text-blue-600" : ""} />
              <span className="text-sm">
                {liked ? post.likes + 1 : post.likes}
              </span>
            </button>
            <button className="flex items-center gap-2">
              <MessageSquare size={16} />
              <span className="text-sm">{post.comments}</span>
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
            src="/src/assets/default-avatar.jpg"
            alt=""
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
