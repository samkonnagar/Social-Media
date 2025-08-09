import { Router } from "express";
import {
  handleGetNotificattion,
  handledeleteNotification,
  handleDeleteAllNotifications,
} from "../controllers/notifications.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();
router.use(verifyJWT);

router.route("/").get(handleGetNotificattion);
router.route("/:id").delete(handledeleteNotification);
router.route("/").delete(handleDeleteAllNotifications);

export default router;
