import { Router } from "express";
import { handleProfileImage } from "../controllers/file.controller.js";
import { fileUpload } from "../middleware/multer.middleware.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router
  .route("/avatar")
  .post(verifyJWT, fileUpload("profiles").single("avatar"), handleProfileImage);

export default router;
