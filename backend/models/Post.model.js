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

postSchema.set("toJSON", {
  virtuals: true,
  transform(doc, ret) {
    const baseUrl = process.env.DOMAIN_NAME + '/files/';

    if (Array.isArray(ret.postUrls)) {
      ret.postUrls = ret.postUrls.map((item) => ({
        ...item,
        url: baseUrl + item.url,
      }));
    }

    return ret;
  },
});

export default model("Post", postSchema);
