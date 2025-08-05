import PostModel from "../models/Post.model.js";
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

const handleDeleteImage = async (req, res) => {
  const id = req.params?.id;
  if (!id) throw new ApiError(400, "Image ID is required");
  const post = await PostModel.findOne({
    "postUrls._id": id,
    author: req.user._id,
  });
  if (!post)
    throw new ApiError(
      404,
      "Post not found or you do not have permission to delete this image"
    );
  const image = post.postUrls.id(id);
  await PostModel.updateOne(
    { _id: post._id },
    { $pull: { postUrls: { _id: id } } }
  );
  deleteFile(`uploads/posts/${image.url}`);
  res
    .status(200)
    .json(new ApiResponse(200, null, "Image deleted successfully"));
};

const handleAddImage = async (req, res) => {
  const postId = req.params?.postId;
  if (!postId) throw new ApiError(400, "Post ID is required");
  if (!req.files) throw new ApiError(400, "No file uploaded");
  const post = await PostModel.findOne({
    _id: postId,
    author: req.user._id,
  });
  if (!post) {
    for (const file of req.files) {
      deleteFile(`uploads/posts/${file.filename}`);
    }
    throw new ApiError(
      404,
      "Post not found or you do not have permission to add an image"
    );
  }
  for (const file of req.files) {
    const fileName = file.filename;
    post.postUrls.push({
      url: fileName,
      mimeType: file.mimetype,
      createdAt: new Date(),
    });
  }
  await post.save();
  res.status(200).json(new ApiResponse(200, post, "Image added successfully"));
};

export { handleProfileImage, handleDeleteImage, handleAddImage };
