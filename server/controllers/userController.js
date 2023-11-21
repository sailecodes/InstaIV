import { StatusCodes } from "http-status-codes";

import userModel from "../models/userModel.js";
import { NotFoundError } from "../custom-errors/customErrors.js";

export const getUserProfile = async (req, res) => {
  const user = await userModel.findById(req.userInfo.userId).select("-_id -email -password -chats -__v");

  if (!user) throw new NotFoundError(`No user with id ${req.userInfo.userId} found`);

  res.status(StatusCodes.OK).json({ msg: "(Server message) Retrieved user info", data: user });
};

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

  if (!user || !followedUser)
    throw new NotFoundError(`No user with id ${!user ? req.userInfo.userId : req.params.id} found`);

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
    throw new NotFoundError(`No user with id ${!user ? req.userInfo.userId : req.params.id} found`);

  user.following = user.following.filter((id) => id.toString() !== req.params.id);
  followedUser.followers = followedUser.followers.filter((id) => id.toString() !== req.userInfo.userId);

  await user.save();
  await followedUser.save();

  res.status(StatusCodes.OK).json({ msg: "(Server message) Unfollowed user" });
};
