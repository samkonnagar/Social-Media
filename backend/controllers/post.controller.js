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

  return res.status(200).json(new ApiResponse(200, data));
};

const handleGetPostDetails = async (req, res) => {
  const id = req.params?.id;
  const post = await PostModel.findById(req.params?.id).populate(
    "author",
    "name avatar"
  );

  if (!post) throw new ApiError(404, "Post not found");
  const comments = await CommentModel.find({
    post: new mongoose.Types.ObjectId(id),
  }).populate("author", "name avatar").select(
    "-post -__v"
  );
  const userPost = post.toObject();

  userPost.comments = comments;
  return res.status(200).json(new ApiResponse(200, userPost));
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
