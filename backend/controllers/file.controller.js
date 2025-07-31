import UserModel from "../models/User.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { deleteFile } from "../utils/upload.utils.js";

const handleProfileImage = async (req, res) => {
  if (!req.file) throw new ApiError(400, "No file uploaded");
  const fileName = req.file.filename;
  const id = req.user._id;
  const user = await UserModel.findById(id).select("-password -__v");
  if (!user) throw new ApiError(404, "User not found");
  const oldAvatar = user.avatar;
  if (oldAvatar) deleteFile(`uploads/profiles/${oldAvatar}`);
  user.avatar = fileName;
  await user.save();
  res.status(200).json(new ApiResponse(200, user, "Profile image updated"));
};

export { handleProfileImage };
