import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import UserModel from "../models/User.model.js";
import mongoose from "mongoose";

const handleGetAllUser = async (req, res) => {
  let skip = 0;
  let limit = 30;
  const q = req.query?.q;
  if (req.query?.page) {
    const getNum = Number(req.query.page);
    if (isNaN(getNum) || getNum < 1) {
      throw new ApiError(400, "Invalid Datatype");
    }
    skip = (getNum - 1) * limit;
  }

  const matchStage = {};

  if (q) {
    matchStage.name = { $regex: "^" + q, $options: "i" };
  }

  const results = await UserModel.aggregate([
    {
      $match: {
        ...matchStage,
        _id: { $ne: new mongoose.Types.ObjectId(req.user?._id) },
        blockList: { $ne: new mongoose.Types.ObjectId(req.user?._id) }
      },
    },
    { $sort: { createdAt: -1 } },
    {
      $project: {
        __v: 0,
        followers: 0,
        following: 0,
        blockList: 0,
        password: 0,
      },
    },
    {
      $skip: skip,
    },
    {
      $limit: limit,
    },
  ]);

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        results,
      },
      "Successfull"
    )
  );
};

const handleBlockUser = async (req, res) => {
  const b_id = req.params?.id;
  const _id = req.user?._id;
  const user = await UserModel.findByIdAndUpdate(
    _id,
    {
      $addToSet: {
        blockList: b_id,
      },
    },
    { new: true }
  ).select("-password -__v");
  if (!user) {
    throw new ApiError(400, "Invalid Id");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, user, "User Blocked Successfully"));
};

const handleUnblockUser = async (req, res) => {
  const b_id = req.params?.id;
  const _id = req.user?._id;
  const user = await UserModel.findByIdAndUpdate(
    _id,
    {
      $pull: {
        blockList: b_id,
      },
    },
    { new: true }
  ).select("-password -__v");
  if (!user) {
    throw new ApiError(400, "Invalid Id");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, user, "User Unblocked Successfully"));
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
