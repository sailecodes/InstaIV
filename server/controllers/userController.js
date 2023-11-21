import fs from "fs";
import { v2 as cloudinary } from "cloudinary";
import { StatusCodes } from "http-status-codes";

import userModel from "../models/userModel.js";
import contentModel from "../models/contentModel.js";
import { BadRequestError, NotFoundError } from "../custom-errors/customErrors.js";

// FIXME: For testing purposes, delete later.
export const getAllUsers = async (req, res) => {
  const users = await userModel.find({});

  res
    .status(StatusCodes.OK)
    .json({ msg: "(Server message) Retrieved all users", data: { users, count: users.length } });
};

// ==============================================
// User profile
// ==============================================

export const getUserProfile = async (req, res) => {
  const user = await userModel.findById(req.userInfo.userId).select("-_id -email -password -chats -__v");

  if (!user) throw new NotFoundError(`No user with id ${req.userInfo.userId} found`);

  res.status(StatusCodes.OK).json({ msg: "(Server message) Retrieved user info", data: user });
};

// ==============================================
// Profile picture
// ==============================================

export const createUserProfilePic = async (req, res) => {
  if (!req.files.profilePic.mimetype.includes("image")) throw new BadRequestError("Incorrect file type");

  const user = await userModel.findById(req.userInfo.userId);

  if (!user) throw new NotFoundError(`No user with id ${req.userInfo.userId} found`);

  const result = await cloudinary.uploader.upload(req.files.profilePic.tempFilePath, {
    use_filename: true,
    folder: "InstaIV",
  });
  const pf = await contentModel.create({ publicId: result.public_id, imageUrl: result.secure_url });
  user.profilePicture = pf._id;
  await user.save();

  fs.unlinkSync(req.files.profilePic.tempFilePath);

  return res
    .status(StatusCodes.CREATED)
    .json({ msg: "(Server message) Created profile picture", data: { imageUrl: result.secure_url } });
};

export const updateUserProfilePic = async (req, res) => {
  if (!req.files.profilePic.mimetype.includes("image")) throw new BadRequestError("Incorrect file type");

  const user = await userModel.findById(req.userInfo.userId);

  if (!user) throw new NotFoundError(`No user with id ${req.userInfo.userId} found`);

  const previousPf = await contentModel.findById(user.profilePicture);

  if (!previousPf) throw new NotFoundError(`No profile picture with id ${user.profilePicture} found`);

  await cloudinary.uploader.destroy(previousPf.publicId);

  const result = await cloudinary.uploader.upload(req.files.profilePic.tempFilePath, {
    use_filename: true,
    folder: "InstaIV",
  });
  await contentModel.findByIdAndUpdate(
    previousPf._id,
    {
      publicId: result.public_id,
      imageUrl: result.secure_url,
    },
    { runValidators: true }
  );

  fs.unlinkSync(req.files.profilePic.tempFilePath);

  return res
    .status(StatusCodes.CREATED)
    .json({ msg: "(Server message) Updated profile picture", data: { imageUrl: result.secure_url } });
};

// ==============================================
// Followers/following
// ==============================================

export const getUserFollowers = async (req, res) => {
  const user = await userModel.findById(req.userInfo.userId);

  if (!user) throw new NotFoundError(`No user with id ${req.userInfo.userId} found`);

  res.status(StatusCodes.OK).json({
    msg: "(Server message) Retrieved user followers",
    data: { followers: user.followers, count: user.followers.length },
  });
};

export const getUserFollowing = async (req, res) => {
  const user = await userModel.findById(req.userInfo.userId);

  if (!user) throw new NotFoundError(`No user with id ${req.userInfo.userId} found`);

  res.status(StatusCodes.OK).json({
    msg: "(Server message) Retrieved user following",
    data: { following: user.following, count: user.following.length },
  });
};

export const followUser = async (req, res) => {
  const user = await userModel.findById(req.userInfo.userId);
  const followedUser = await userModel.findById(req.params.id);

  if (!user || !followedUser)
    throw new NotFoundError(
      `No user with id ${
        !user ? (!followedUser ? `${req.userInfo.userId} and ${req.params.id}` : req.userInfo.userId) : req.params.id
      } found`
    );

  user.following.push(req.params.id);
  followedUser.followers.push(req.userInfo.userId);

  await user.save();
  await followedUser.save();

  res.status(StatusCodes.OK).json({ msg: "(Server message) Followed user" });
};

export const unfollowUser = async (req, res) => {
  const user = await userModel.findById(req.userInfo.userId);
  const followedUser = await userModel.findById(req.params.id);

  if (!user || !followedUser)
    throw new NotFoundError(
      `No user with id ${
        !user ? (!followedUser ? `${req.userInfo.userId} and ${req.params.id}` : req.userInfo.userId) : req.params.id
      } found`
    );

  user.following = user.following.filter((id) => id.toString() !== req.params.id);
  followedUser.followers = followedUser.followers.filter((id) => id.toString() !== req.userInfo.userId);

  await user.save();
  await followedUser.save();

  res.status(StatusCodes.OK).json({ msg: "(Server message) Unfollowed user" });
};
