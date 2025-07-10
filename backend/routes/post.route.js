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
} from "../controllers/post.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();
router.use(verifyJWT);

router.route("/").post(handleNewPost);
router.route("/").get(handleAllPublicPosts);
router.route("/:id").get(handleGetPostDetails);
router.route("/:id").put(handleUpdatePost);
router.route("/:id").delete(handleDeletePost);
router.route("/user/:userId").get(handleGetPostByUserId);
router.route("/:id/like").post(handleLikePost);
router.route("/:id/unlike").post(handleUnlikePost);
router.route("/:id/comment").post(handleAddComment);
router.route("/:id/comment/:commentId").put(handleUpdateComment);
router.route("/:id/comment/:commentId").delete(handleDeleteComment);

export default router;
