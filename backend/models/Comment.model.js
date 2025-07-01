import { Schema, model } from "mongoose";

const commentSchema = new Schema(
  {
    text: {
        type: String,
        trim: true,
      },
    author: { type: Schema.Types.ObjectId, ref: "User" },
    post: { type: Schema.Types.ObjectId, ref: "Post" },
  },
  { timestamps: true }
);

export default model("Comment", commentSchema);
