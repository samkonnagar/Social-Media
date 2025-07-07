import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import UserModel from "../models/User.model.js";

const handleRegisterUser = async (req, res) => {
  const { fullName, email, password } = req.body;
  // validation - not empty
  if (
    [fullName, email, password].some((field) => field?.trim() === "") ||
    !fullName ||
    !email ||
    !password
  ) {
    throw new ApiError(400, "All filds are required");
  }

  // check if user already exist - username and email
  const existedUser = await UserModel.findOne({
    email,
  });
  if (existedUser) {
    throw new ApiError(409, "email already exist");
  }

  // create user object - create entry in db
  const user = await UserModel.create({
    name: fullName.trim(),
    email,
    password,
    avatar: null,
    bio: null,
  });

  // remove password from response
  const createdUser = await UserModel.findById(user._id).select(
    "-password -__v"
  );

  // check for user creation
  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registerimg the user");
  }

  // send cookie
  const options = {
    httpOnly: true,
    secure: true,
  };
  // generateToken
  const token = await createdUser.generateToken();

  return res
    .status(201)
    .cookie("accessToken", token, options)
    .json(
      new ApiResponse(
        201,
        { user: createdUser, accessToken: token },
        "User Created Successfully"
      )
    );
};

const handleLoginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email) {
    throw new ApiError(400, "Email is required");
  }

  // find the user
  const user = await UserModel.findOne({
    email,
  });

  if (!user) {
    throw new ApiError(
      404,
      "user does not exist, please create an account first"
    );
  }

  // check the password
  if (!password) {
    throw new ApiError(404, "please enter the password");
  }
  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "password not correct");
  }

  const loggedInUser = await UserModel.findById(user._id).select(
    "-password -__v"
  );

  // send cookie
  const options = {
    httpOnly: true,
    secure: true,
  };

  // generateToken
  const token = await user.generateToken();

  return res
    .status(200)
    .cookie("accessToken", token, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken: token,
        },
        "user logged In Successfully"
      )
    );
};

const handleGetUser = async (req, res) => {
  res.json({ message: "Feature not added yet!" });
};

const handleUpdateUser = async (req, res) => {
  res.json({ message: "Feature not added yet!" });
};

export { handleRegisterUser, handleLoginUser, handleGetUser, handleUpdateUser };
