import { Schema, model } from "mongoose";

const dataUrl = new Schema(
  {
    url: { type: String, required: true },
    mimeType: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { _id: true }
);

const postSchema = new Schema(
  {
    caption: {
      type: String,
      trim: true,
    },
    postUrls: [dataUrl],
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
    sharedBy: [{ type: Schema.Types.ObjectId, ref: "User" }],
    savedBy: [{ type: Schema.Types.ObjectId, ref: "User" }],
    views: { type: Number, default: 0 },
    tags: [{ type: String, trim: true }],
    privacy: {
      type: String,
      enum: ["public", "followers", "private"],
      default: "public",
    },
  },
  { timestamps: true }
);

export default model("Post", postSchema);
