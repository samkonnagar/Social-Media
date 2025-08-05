import { Router } from "express";
import {
  handleProfileImage,
  handleDeleteImage,
  handleAddImage,
} from "../controllers/file.controller.js";
import { fileUpload } from "../middleware/multer.middleware.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router
  .route("/avatar")
  .post(verifyJWT, fileUpload("profiles").single("avatar"), handleProfileImage);

router.route("/image/:id").delete(verifyJWT, handleDeleteImage);
router
  .route("/image/:postId")
  .put(verifyJWT, fileUpload("posts").array("post_imgs", 5), handleAddImage);

export default router;
