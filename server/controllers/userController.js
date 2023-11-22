import fs from "fs";
import { v2 as cloudinary } from "cloudinary";
import { StatusCodes } from "http-status-codes";

import userModel from "../models/userModel.js";
import contentModel from "../models/contentModel.js";
import { BadRequestError, NotFoundError } from "../custom-errors/customErrors.js";

// TODO: For testing purposes, delete later.
export const getAllUsers = async (req, res) => {
  const users = await userModel.find({});

  res
    .status(StatusCodes.OK)
    .json({ msg: "(Server message) Retrieved all users", data: { users, count: users.length } });
};

// ==============================================
// Profile picture
// ==============================================

// TODO: Impl. safety feature to remove the uploaded image and created Content document when an error
//       occurs afterwards
export const createProfilePicture = async (req, res) => {
  const user = await userModel.findById(req.userInfo.userId);

  if (!user) throw new NotFoundError(`No user with id ${req.userInfo.userId} found`);

  const cloudinaryResult = await cloudinary.uploader.upload(req.files.profilePicture.tempFilePath, {
    use_filename: true,
    folder: "InstaIV/Profile-pictures",
  });

  const content = await contentModel.create({
    imageUrl: cloudinaryResult.secure_url,
    publicId: cloudinaryResult.public_id,
  });

  user.profilePictureInfo = { imageUrl: cloudinaryResult.secure_url, contentId: content._id };
  await user.save();

  fs.unlinkSync(req.files.profilePicture.tempFilePath);

  return res.status(StatusCodes.CREATED).json({ msg: "(Server message) Created profile picture" });
};

// TODO: Impl. safety feature to redo any changes if an error occurs
export const updateProfilePicture = async (req, res) => {
  const user = await userModel.findById(req.userInfo.userId);

  if (!user) throw new NotFoundError(`No user with id ${req.userInfo.userId} found`);

  const content = await contentModel.findById(user.profilePictureInfo.contentId);

  if (!content) throw new NotFoundError(`No profile picture with id ${user.profilePictureInfo.contentId} found`);

  await cloudinary.uploader.destroy(content.publicId);
  const result = await cloudinary.uploader.upload(req.files.profilePicture.tempFilePath, {
    use_filename: true,
    folder: "InstaIV/Profile-pictures",
  });

  content.imageUrl = result.secure_url;
  content.publicId = result.public_id;
  await content.save();

  user.profilePictureInfo.imageUrl = result.secure_url;
  await user.save();

  fs.unlinkSync(req.files.profilePicture.tempFilePath);

  return res.status(StatusCodes.CREATED).json({ msg: "(Server message) Updated profile picture" });
};

// ==============================================
// Followers/following
// ==============================================

export const getFollowers = async (req, res) => {
  const user = await userModel.findById(req.userInfo.userId);

  if (!user) throw new NotFoundError(`No user with id ${req.userInfo.userId} found`);

  res.status(StatusCodes.OK).json({
    msg: "(Server message) Retrieved user followers",
    data: { followers: user.followers, count: user.followers.length },
  });
};

export const getFollowing = async (req, res) => {
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

  if (!user && !followedUser)
    throw new NotFoundError(`No users with ids ${req.userInfo.userId} and ${req.params.id} found`);
  else if (!user || !followedUser)
    throw new NotFoundError(`No user with id ${!user ? req.userInfo.userId : req.params.id} found`);

  followedUser.followers.push(req.userInfo.userId);
  await followedUser.save();

  user.following.push(req.params.id);
  await user.save();

  res.status(StatusCodes.OK).json({ msg: "(Server message) Followed user" });
};

export const unfollowUser = async (req, res) => {
  const user = await userModel.findById(req.userInfo.userId);
  const unfollowedUser = await userModel.findById(req.params.id);

  if (!user && !unfollowedUser)
    throw new NotFoundError(`No users with ids ${req.userInfo.userId} and ${req.params.id} found`);
  else if (!user || !unfollowedUser)
    throw new NotFoundError(`No user with id ${!user ? req.userInfo.userId : req.params.id} found`);

  unfollowedUser.followers = unfollowedUser.followers.filter((id) => id.toString() !== req.userInfo.userId);
  await unfollowedUser.save();

  user.following = user.following.filter((id) => id.toString() !== req.params.id);
  await user.save();

  res.status(StatusCodes.OK).json({ msg: "(Server message) Unfollowed user" });
};

// ==============================================
// User profile
// ==============================================

export const getProfile = async (req, res) => {
  const user = await userModel.findById(req.params.id).select("-email -password -chats -__v");

  if (!user) throw new NotFoundError(`No user with id ${req.params.id} found`);

  res.status(StatusCodes.OK).json({ msg: "(Server message) Retrieved user info", data: user });
};
