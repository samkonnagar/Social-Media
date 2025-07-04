import { Router } from "express";
import {
  handleRegisterUser,
  handleLoginUser,
  handleGetUser,
  handleUpdateUser,
} from "../controllers/auth.controller.js";

const router = Router();

router.route("/register").post(handleRegisterUser);
router.route("/login").post(handleLoginUser);
router.route("/me").get(handleGetUser);
router.route("/profile").put(handleUpdateUser);

export default router;
