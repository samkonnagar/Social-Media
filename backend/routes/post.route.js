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
} from "../controllers/post.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { fileUpload } from "../middleware/multer.middleware.js";

const router = Router();
router.use(verifyJWT);

// Create & List
router
  .route("/")
  .post(fileUpload("posts").array("post_imgs", 5), handleNewPost)
  .get(handleAllPublicPosts);

// User-specific
router.route("/user/:userId").get(handleGetPostByUserId);
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

// Comments
router.route("/:id/comment").post(handleAddComment);
router
  .route("/:commentId/comment")
  .put(handleUpdateComment)
  .delete(handleDeleteComment);

export default router;
