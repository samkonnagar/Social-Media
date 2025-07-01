import { Schema, model } from "mongoose";

const postSchema = new Schema(
  {
    caption: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
      trim: true,
    },
    author: { type: Schema.Types.ObjectId, ref: "User" },
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

export default model("Post", postSchema);
