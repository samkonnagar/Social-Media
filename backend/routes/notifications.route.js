import { Router } from "express";
import {
  handleGetNotificattion,
  handledeleteNotification,
} from "../controllers/notifications.controller.js";

const router = Router();

router.route("/").get(handleGetNotificattion);
router.route("/:id").delete(handledeleteNotification);

export default router;
