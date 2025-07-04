import { Router } from "express";
import {
  handleProfileImage,
  handlePostImage,
  handleServeFile,
} from "../controllers/file.controller.js";

const router = Router();

router.route("/avatar").post(handleProfileImage);
router.route("/post").post(handlePostImage);
router.route("/:filename").get(handleServeFile);

export default router;
