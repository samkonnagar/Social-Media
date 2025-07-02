import { Router } from "express";
import {
  handleRegisterUser,
  handleLoginUser,
  handleGetUser,
  handleUpdateUser,
  handleGetAllUser,
  handleBlockUser,
  handleUnblockUser,
} from "../controllers/auth.controller.js";

const router = Router();

router.route("/register").post(handleRegisterUser);
router.route("/login").post(handleLoginUser);
router.route("/me").get(handleGetUser);
router.route("/profile").put(handleUpdateUser);
router.route("/users").get(handleGetAllUser);
router.route("/users/:id/block").put(handleBlockUser);
router.route("/users/:id/unblock").put(handleUnblockUser);

export default router;
