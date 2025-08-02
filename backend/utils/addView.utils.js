import PostModel from "../models/Post.model.js";
import { ApiError } from "../utils/ApiError.js";

const addView = async (postId) => {
  try {
    const post = await PostModel.findById(postId);
    if (!post) throw new ApiError(404, "Post not found");
    post.views += 1;
    await post.save();
    return post.views;
  } catch (error) {
    throw new ApiError(500, error.message || "Error adding view to post");
  }
};

export { addView };