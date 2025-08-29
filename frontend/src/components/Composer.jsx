import React, { useState } from "react";
import { dataObj } from "../context/authContext/AuthContext";

export default function Composer({ onCreate }) {
  const {user} = dataObj()
  const [text, setText] = useState("");
  const [images, setImages] = useState([]);

  function handleFiles(e) {
    const files = Array.from(e.target.files);
    const urls = files.map((f) => URL.createObjectURL(f));
    setImages((p) => [...p, ...urls]);
  }

  function handlePost() {
    if (!text && images.length === 0) return;
    const newPost = {
      id: "p" + (Math.random() * 10000).toFixed(0),
      authorId: "u1",
      authorName: "Rohit Sharma",
      authorAvatar: "/src/assets/default-avatar.jpg",
      time: "now",
      images,
      caption: text,
      likes: 0,
      comments: 0,
      tags: [],
    };
    onCreate?.(newPost);
    setText("");
    setImages([]);
  }

  return (
    <div className="bg-white rounded-md shadow p-4 mb-6">
      <div className="flex gap-3">
        <img
          src={user.avatar ?? "/dummy.png"}
          alt={user?.name}
          className="h-11 w-11 rounded-full"
        />
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={2}
          className="flex-1 resize-none p-3 rounded bg-gray-50 outline-none"
          placeholder="What's happening?"
        />
      </div>

      {images.length > 0 && (
        <div className="mt-3 grid grid-cols-3 gap-2">
          {images.map((src, i) => (
            <img
              key={i}
              src={src}
              className="h-24 w-full object-cover rounded"
              alt=""
            />
          ))}
        </div>
      )}

      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <label className="cursor-pointer text-sm text-gray-600 hover:text-gray-800">
            Attach
            <input
              type="file"
              className="hidden"
              multiple
              accept="image/*"
              onChange={handleFiles}
            />
          </label>
          <button className="text-sm text-gray-600">Feeling</button>
        </div>
        <div>
          <button
            onClick={handlePost}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
}
