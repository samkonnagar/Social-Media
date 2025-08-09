import NotificationModel from "../models/Notification.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import mongoose from "mongoose";

const handleGetNotificattion = async (req, res) => {
  const userId = req.user._id;
  if (!userId) throw new ApiError(401, "Unauthorized access");

  const notifications = await NotificationModel.find({ toUser: userId })
    .sort({ createdAt: -1 })
    .populate("id")
    .limit(50);

  return res.status(200).json(new ApiResponse(200, notifications));
};

const handledeleteNotification = async (req, res) => {
  const notificationId = req.params?.id;
  if (!notificationId) throw new ApiError(400, "Notification ID is required");
  const userId = req.user._id;
  if (!userId) throw new ApiError(401, "Unauthorized access");

  const notification = await NotificationModel.findOneAndDelete({
    _id: new mongoose.Types.ObjectId(notificationId),
    toUser: userId,
  });

  if (!notification)
    throw new ApiError(404, "Notification not found or unauthorized");

  return res.status(200).json(new ApiResponse(200, {}, "Deleted successfully"));
};

const handleDeleteAllNotifications = async (req, res) => {
  const userId = req.user._id;
  if (!userId) throw new ApiError(401, "Unauthorized access");
  await NotificationModel.deleteMany({ toUser: userId });
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "All notifications deleted"));
};

export {
  handleGetNotificattion,
  handledeleteNotification,
  handleDeleteAllNotifications,
};
