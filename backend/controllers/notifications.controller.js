const handleGetNotificattion = async (req, res) => {
  res.json({ message: "Get user notifications" });
};

const handledeleteNotification = async (req, res) => {
  res.json({ message: "Mark or delete notification" });
};

export { handleGetNotificattion, handledeleteNotification };
