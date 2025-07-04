const handleNewPost = async (req, res) => {
  res.json({ message: "Create a new post" });
};

const handleAllPublicPosts = async (req, res) => {
  res.json({ message: "Get all public posts" });
};

const handleGetPostDetails = async (req, res) => {
  res.json({ message: " Get post details" });
};

const handleUpdatePost = async (req, res) => {
  res.json({ message: "Update own post" });
};

const handleDeletePost = async (req, res) => {
  res.json({ message: "Delete own post" });
};

const handleGetPostByUserId = async (req, res) => {
  res.json({ message: "Get posts by a user" });
};

const handleLikePost = async (req, res) => {
  res.json({ message: "Like a post" });
};

const handleUnlikePost = async (req, res) => {
  res.json({ message: "Unlike a post" });
};

const handleAddComment = async (req, res) => {
  res.json({ message: "Add a comment" });
};

const handleUpdateComment = async (req, res) => {
  res.json({ message: "Update a comment" });
};

const handleDeleteComment = async (req, res) => {
  res.json({ message: "Delete a comment" });
};

export {
  handleNewPost,
  handleAllPublicPosts,
  handleGetPostDetails,
  handleUpdatePost,
  handleDeletePost,
  handleGetPostByUserId,
  handleLikePost,
  handleUnlikePost,
  handleAddComment,
  handleUpdateComment,
  handleDeleteComment,
};
