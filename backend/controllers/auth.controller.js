const handleRegisterUser = async (req, res) => {
  res.json({ message: "Feature not added yet!" });
};

const handleLoginUser = async (req, res) => {
  res.json({ message: "Feature not added yet!" });
};

const handleGetUser = async (req, res) => {
  res.json({ message: "Feature not added yet!" });
};

const handleUpdateUser = async (req, res) => {
  res.json({ message: "Feature not added yet!" });
};

const handleGetAllUser = async (req, res) => {
  res.json({ message: "Feature not added yet!" });
};

const handleBlockUser = async (req, res) => {
  const id = req.params?.id;
  res.json({ message: "Feature not added yet!", id });
};

const handleUnblockUser = async (req, res) => {
  res.json({ message: "Feature not added yet!" });
};

export {
  handleRegisterUser,
  handleLoginUser,
  handleGetUser,
  handleUpdateUser,
  handleGetAllUser,
  handleBlockUser,
  handleUnblockUser,
};
