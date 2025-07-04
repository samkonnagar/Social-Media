const handleGetAllUser = async (req, res) => {
  res.json({ message: "Get all users" });
};

const handleBlockUser = async (req, res) => {
  const id = req.params?.id;
  res.json({ message: "Block a user", id });
};

const handleUnblockUser = async (req, res) => {
  const id = req.params?.id;
  res.json({ message: "Unblock a user", id });
};

const handleFollowUser = async (req, res) => {
  res.json({ message: "Follow a user" });
};

const handleUnfollowUser = async (req, res) => {
  res.json({ message: "Unfollow a user" });
};

const handleGetFollowers = async (req, res) => {
  res.json({ message: "Get list of followers" });
};

const handleGetFollowing = async (req, res) => {
  res.json({ message: "Get list of following" });
};

export {
  handleGetAllUser,
  handleBlockUser,
  handleUnblockUser,
  handleFollowUser,
  handleUnfollowUser,
  handleGetFollowers,
  handleGetFollowing,
};
