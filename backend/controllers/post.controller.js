import PostModel from "../models/Post.model.js";
import CommentModel from "../models/Comment.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import mongoose from "mongoose";
import { formatFileData } from "../utils/upload.utils.js";

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
  post.postUrls.forEach((urlObj) => {
    urlObj.url = `${process.env.DOMAIN_NAME}/files/${urlObj.url}`;
  });

  return res
    .status(201)
    .json(new ApiResponse(201, post, "Post created successfully"));
};

const handleAllPublicPosts = async (req, res) => {
  res.json({ message: "Get all public posts" });
};

const handleGetPostDetails = async (req, res) => {
  res.json({ message: " Get post details" });
};

const handleUpdatePost = async (req, res) => {
  res.json({ message: "Update own post" });
};

const handleDeletePost = async (req, res) => {
  res.json({ message: "Delete own post" });
};

const handleGetPostByUserId = async (req, res) => {
  res.json({ message: "Get posts by a user" });
};

const handleLikePost = async (req, res) => {
  res.json({ message: "Like a post" });
};

const handleUnlikePost = async (req, res) => {
  res.json({ message: "Unlike a post" });
};

const handleAddComment = async (req, res) => {
  res.json({ message: "Add a comment" });
};

const handleUpdateComment = async (req, res) => {
  res.json({ message: "Update a comment" });
};

const handleDeleteComment = async (req, res) => {
  res.json({ message: "Delete a comment" });
};

const handleGetUserFeed = async (req, res) => {
  res.json({ message: "Delete a comment" });
};

const handleGetSavedPosts = async (req, res) => {
  res.json({ message: "Delete a comment" });
};

const handleSharePost = async (req, res) => {
  res.json({ message: "Delete a comment" });
};

const handleSavePost = async (req, res) => {
  res.json({ message: "Delete a comment" });
};

const handleUnsavePost = async (req, res) => {
  res.json({ message: "Delete a comment" });
};

const handleTrackView = async (req, res) => {
  res.json({ message: "Delete a comment" });
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
  handleGetUserFeed,
  handleGetSavedPosts,
  handleSharePost,
  handleSavePost,
  handleUnsavePost,
  handleTrackView,
};
