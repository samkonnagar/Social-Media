import NotificationModel from "../models/Notification.model.js";

const setNotification = async (message, userId, type, id) => {
  const notification = await NotificationModel.insertOne({
    toUser: userId,
    message: message,
    type: type,
    id: id,
  });
  return notification;
};

export { setNotification };