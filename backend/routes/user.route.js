import { Router } from "express";
import {
  handleGetAllUser,
  handleBlockUser,
  handleUnblockUser,
  handleFollowUser,
  handleUnfollowUser,
  handleGetFollowers,
  handleGetFollowing,
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();
router.use(verifyJWT);

router.route("/").get(handleGetAllUser);
router.route("/:id/block").put(handleBlockUser);
router.route("/:id/unblock").put(handleUnblockUser);
router.route("/:id/follow").post(handleFollowUser);
router.route("/:id/unfollow").post(handleUnfollowUser);
router.route("/:id/followers").get(handleGetFollowers);
router.route("/:id/following").get(handleGetFollowing);

export default router;
