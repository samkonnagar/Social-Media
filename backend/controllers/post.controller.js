import PostModel from "../models/Post.model.js";
import CommentModel from "../models/Comment.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import mongoose from "mongoose";
import { deleteFile, formatFileData } from "../utils/upload.utils.js";
import UserModel from "../models/User.model.js";
import { addView } from "../utils/addView.utils.js";

const handleNewPost = async (req, res) => {
  const { caption, tags, privacy } = req.body;
  const author = req.user?._id;
  const postUrls = formatFileData(req.files || []);
  const tagArr = tags?.split(",").map((data) => data.trim().toLowerCase());
  if (!postUrls) throw new ApiError(400, "Choose Atleast One Pic");
  const post = await PostModel.create({
    caption: caption ?? "",
    postUrls,
    author,
    tags: tagArr ?? [],
    privacy,
  });
  if (!post) {
    throw new ApiError(500, "Something went wrong while create a post");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, post, "Post created successfully"));
};

const handleAllPublicPosts = async (req, res) => {
  let skip = 0;
  let limit = 20;
  let getNum = 0;
  if (req.query?.auto) {
    getNum = Number(req.query.auto);
    limit = 5;
    if (isNaN(getNum) || getNum < 1) {
      throw new ApiError(400, "Invalid Datatype");
    }
    skip = (getNum - 1) * limit + 20;
  }
  const posts = await PostModel.find({ privacy: "public" })
    .populate("author", "name avatar")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  if (!posts) throw new ApiError(500, "Something went wrong");

  const data = {
    posts,
    auto_avalable: true,
    auto_num: getNum,
    no_of_posts: posts.length,
  };

  if (posts.length < limit) data.auto_avalable = false;

  posts.forEach((post) => {
    addView(post._id);
  });

  return res.status(200).json(new ApiResponse(200, data));
};

const handleGetPostDetails = async (req, res) => {
  const id = req.params?.id;
  const post = await PostModel.findById(req.params?.id).populate(
    "author",
    "name avatar"
  );
  if (!post) throw new ApiError(404, "Post not found");
  addView(post._id);
  const comments = await CommentModel.find({
    post: new mongoose.Types.ObjectId(id),
  })
    .populate("author", "name avatar")
    .select("-post -__v");
  const userPost = post.toJSON();

  userPost.comments = comments;
  return res.status(200).json(new ApiResponse(200, userPost));
};

const handleUpdatePost = async (req, res) => {
  res.json({ message: "Update own post" });
};

const handleDeletePost = async (req, res) => {
  const id = req.params?.id;
  if (!id) throw new ApiError(400, "Invalid Post Id");
  const post = await PostModel.findOneAndDelete({
    _id: new mongoose.Types.ObjectId(id),
    author: new mongoose.Types.ObjectId(req.user._id),
  });

  if (!post) throw new ApiError(403, "Unauthorized or post not found");

  post.postUrls.forEach((file) => {
    deleteFile(`uploads/posts/${file.url}`);
  });

  await CommentModel.deleteMany({ post: new mongoose.Types.ObjectId(id) });

  return res.status(200).json(new ApiResponse(200, {}, "Post deleted"));
};

const handleGetPostByUserId = async (req, res) => {
  const userId = req.params?.userId;
  if (!userId) throw new ApiError(400, "Invalid User Id");
  const user = await UserModel.findById(userId).select("blockList");
  if (!user) throw new ApiError(404, "User not found");
  // Check if the user is blocked by the current user
  const isBlocked = user?.blockList?.includes(req.user._id);
  if (isBlocked) throw new ApiError(403, "You are blocked by this user");

  const posts = await PostModel.find({
    author: new mongoose.Types.ObjectId(userId),
  })
    .populate("author", "name avatar")
    .sort({ createdAt: -1 });
  if (!posts) throw new ApiError(404, "No Posts Available");
  return res.status(200).json(new ApiResponse(200, posts));
};

const handleLikePost = async (req, res) => {
  const postId = req.params?.id;
  if (!postId) throw new ApiError(400, "Invalid Post Id");
  const post = await PostModel.findById(postId).populate(
    "author",
    "name avatar"
  );
  if (!post) throw new ApiError(404, "Post not found");
  if (post.likes.includes(req.user._id))
    throw new ApiError(400, "You already liked this post");
  post.likes.push(req.user._id);
  await post.save();

  res.status(200).json(new ApiResponse(200, post, "Post liked successfully"));
};

const handleUnlikePost = async (req, res) => {
  const postId = req.params?.id;
  if (!postId) throw new ApiError(400, "Invalid Post Id");
  const post = await PostModel.findById(postId).populate(
    "author",
    "name avatar"
  );
  if (!post) throw new ApiError(404, "Post not found");
  if (!post.likes.includes(req.user._id))
    throw new ApiError(400, "You haven't liked this post yet");
  post.likes = post.likes.filter((like) => !like.equals(req.user._id));
  await post.save();
  res.status(200).json(new ApiResponse(200, post, "Post unliked successfully"));
};

const handleAddComment = async (req, res) => {
  const { text } = req.body;
  const id = req.params?.id;

  const post = await PostModel.findById(id);
  if (!post) throw new ApiError(400, "Invalid Post Id");
  const comment = await CommentModel.create({
    text,
    author: new mongoose.Types.ObjectId(req.user._id),
    post: post._id,
  });

  return res.status(201).json(new ApiResponse(201, comment, "Comment added"));
};

const handleUpdateComment = async (req, res) => {
  const { text } = req.body;
  if (!text) throw new ApiError(400, "Text is required to update comment");
  const commentId = req.params?.commentId;
  if (!commentId) throw new ApiError(400, "Invalid Comment Id");
  const comment = await CommentModel.findOneAndUpdate(
    { _id: commentId, author: req.user._id },
    { text },
    { new: true }
  ).populate("author", "name avatar");
  if (!comment) throw new ApiError(404, "Comment not found or unauthorized");

  res.status(200).json(new ApiResponse(200, comment, "Comment updated"));
};

const handleDeleteComment = async (req, res) => {
  const commentId = req.params?.commentId;
  if (!commentId) throw new ApiError(400, "Invalid Comment Id");
  const comment = await CommentModel.findOneAndDelete({
    _id: commentId,
    author: req.user._id,
  });
  if (!comment) throw new ApiError(404, "Comment not found or unauthorized");

  res.status(200).json(new ApiResponse(200, {}, "Comment deleted"));
};

const handleGetSavedPosts = async (req, res) => {
  const userId = req.user._id;
  const user = await UserModel.findById(userId).populate("savedPosts");
  if (!user) throw new ApiError(404, "User not found");
  if (user.savedPosts.length === 0) {
    return res
      .status(200)
      .json(new ApiResponse(200, [], "No saved posts found"));
  }
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        user.savedPosts,
        "Saved posts retrieved successfully"
      )
    );
};

const handleSharePost = async (req, res) => {
  const postId = req.params?.id;
  const user = await UserModel.findById(req.user._id);
  if (!user) throw new ApiError(404, "User not found");
  if (!postId) throw new ApiError(400, "Invalid Post Id");
  const post = await PostModel.findById(postId);
  if (!post) throw new ApiError(404, "Post not found");
  post.sharedBy.push(user._id);
  await post.save();

  return res
    .status(200)
    .json(new ApiResponse(200, post, "Post shared successfully"));
};

const handleSavePost = async (req, res) => {
  const postId = req.params?.id;
  const id = req.user._id;
  if (!postId) throw new ApiError(400, "Invalid Post Id");
  const post = await PostModel.findById(postId).populate(
    "author",
    "name avatar"
  );
  if (!post) throw new ApiError(404, "Post not found");
  const user = await UserModel.findById(id);
  if (!user) throw new ApiError(404, "User not found");
  if (user.savedPosts.includes(postId)) {
    throw new ApiError(400, "Post already saved");
  }
  user.savedPosts.push(postId);
  await user.save();
  return res
    .status(200)
    .json(new ApiResponse(200, post, "Post saved successfully"));
};

const handleUnsavePost = async (req, res) => {
  const postId = req.params?.id;
  const id = req.user._id;
  if (!postId) throw new ApiError(400, "Invalid Post Id");
  const post = await PostModel.findById(postId).populate(
    "author",
    "name avatar"
  );
  if (!post) throw new ApiError(404, "Post not found");
  const user = await UserModel.findById(id);
  if (!user) throw new ApiError(404, "User not found");
  if (!user.savedPosts.includes(postId)) {
    throw new ApiError(400, "Post not saved yet");
  }
  user.savedPosts = user.savedPosts.filter(
    (savedPostId) => !savedPostId.equals(postId)
  );
  await user.save();
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Post unsaved successfully"));
};

export {
  handleNewPost,
  handleAllPublicPosts,
  handleGetPostDetails,
  handleUpdatePost,
  handleDeletePost,
  handleGetPostByUserId,
  handleLikePost,
  handleUnlikePost,
  handleAddComment,
  handleUpdateComment,
  handleDeleteComment,
  handleGetSavedPosts,
  handleSharePost,
  handleSavePost,
  handleUnsavePost,
};
