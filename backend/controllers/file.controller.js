const handleProfileImage = async (req, res) => {
  res.json({ message: "Upload profile picture" });
};

const handlePostImage = async (req, res) => {
  res.json({ message: "Upload post image" });
};

const handleServeFile = async (req, res) => {
  res.json({ message: " Serve uploaded file" });
};

export { handleProfileImage, handlePostImage, handleServeFile };
