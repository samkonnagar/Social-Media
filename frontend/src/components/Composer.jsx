import React, { useState } from "react";
import { dataObj } from "../context/authContext/AuthContext";
import { createPost } from "../api/post";

export default function Composer({ setPosts }) {
  const { user } = dataObj();
  const [text, setText] = useState("");
  const [files, setFiles] = useState([]);

  function handleFiles(e) {
    const getFiles = Array.from(e.target.files);
    setFiles((p) => [...p, ...getFiles]);
  }

  function handlePost() {
    if (!text && files.length === 0) return;
    const formData = new FormData();
    formData.append("caption", text); // text field

    // append multiple files
    for (let i = 0; i < files.length; i++) {
      formData.append("post_imgs", files[i]);
    }

    createPost(formData)
      .then((res) => res?.data?.data)
      .then((post) => setPosts((p) => ({ ...p, data: [post, ...p.data] })))
      .catch((err) => console.warn(err));

    setText("");
    setFiles([]);
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

      {files.length > 0 && (
        <div className="mt-3 grid grid-cols-3 gap-2">
          {files
            .map((f) => URL.createObjectURL(f))
            .map((src, i) => (
              <img
                key={i}
                src={src}
                className="h-24 w-full object-cover rounded"
                alt="image"
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
