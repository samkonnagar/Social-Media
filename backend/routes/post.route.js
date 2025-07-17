import { Router } from "express";
import {
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
  handleSharePost,
  handleSavePost,
  handleUnsavePost,
  handleGetSavedPosts,
  handleTrackView,
  handleGetUserFeed,
} from "../controllers/post.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();
router.use(verifyJWT);

// Create & List
router.route("/").post(handleNewPost).get(handleAllPublicPosts);

// User-specific
router.route("/user/:userId").get(handleGetPostByUserId);
router.route("/feed").get(handleGetUserFeed);
router.route("/saved").get(handleGetSavedPosts);

// Individual Post
router
  .route("/:id")
  .get(handleGetPostDetails)
  .put(handleUpdatePost)
  .delete(handleDeletePost);

// Interactions
router.route("/:id/like").post(handleLikePost);
router.route("/:id/unlike").post(handleUnlikePost);
router.route("/:id/share").post(handleSharePost);
router.route("/:id/save").post(handleSavePost);
router.route("/:id/unsave").post(handleUnsavePost);
router.route("/:id/view").post(handleTrackView);

// Comments
router.route("/:id/comment").post(handleAddComment);
router
  .route("/:id/comment/:commentId")
  .put(handleUpdateComment)
  .delete(handleDeleteComment);

export default router;
