import { Router } from "express";
import {
  handleRegisterUser,
  handleLoginUser,
  handleGetUser,
  handleUpdateUser,
} from "../controllers/auth.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.route("/register").post(handleRegisterUser);
router.route("/login").post(handleLoginUser);
router.route("/me").get(verifyJWT, handleGetUser);
router.route("/profile").put(verifyJWT, handleUpdateUser);

export default router;
