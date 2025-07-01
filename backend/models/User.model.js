import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: [true, "Email already in use"],
      lowercase: true,
      trim: true,
    },
    avatar: {
      type: String,
      trim: true,
    },
    bio: {
      type: String,
      trim: true,
    },
    followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
    following: [{ type: Schema.Types.ObjectId, ref: "User" }],
    blockList: [{ type: Schema.Types.ObjectId, ref: "User" }],
    password: { type: String, required: [true, "Password is required"] },
  },
  { timestamps: true }
);

export default model("User", userSchema);
