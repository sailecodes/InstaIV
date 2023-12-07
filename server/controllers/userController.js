import fs from "fs";
import { v2 as cloudinary } from "cloudinary";
import { StatusCodes } from "http-status-codes";

import userModel from "../models/userModel.js";
import contentModel from "../models/contentModel.js";
import postModel from "../models/postModel.js";
import { BadRequestError, NotFoundError } from "../errors/customErrors.js";

export const getAllUsers = async (req, res) => {
  const users = await userModel.find({ _id: { $ne: req.userInfo.userId } });

  res.status(StatusCodes.OK).json({ msg: "(Server message) Retrieved all users", data: { users } });
};

// ==============================================
// Profile
// ==============================================

export const getProfile = async (req, res) => {
  const user = await userModel.findById(req.params.id).select("-email -password -chats -__v");

  if (!user) throw new NotFoundError(`No user with id ${req.params.id} found`);

  res.status(StatusCodes.OK).json({ msg: "(Server message) Retrieved user info", data: user });
};

// TODO: Impl. safety feature to remove the uploaded image and created Content document when an error
//       occurs afterwards
export const updateProfile = async (req, res) => {
  const user = await userModel.findById(req.params.id);

  if (!user) throw new NotFoundError(`No user with id ${req.params.id} found`);

  // Updates bio if user changed bio
  if (req.body.bio) {
    user.bio = req.body.bio;
    await user.save();
  }

  // Updates pfp if user changed pfp
  if (req.files?.pfp) {
    let url;

    if (user.pfpInfo) {
      // Replaces previous pfp
      const content = await contentModel.findById(user.pfpInfo.contentId);

      if (!content) throw new NotFoundError(`No profile picture with id ${user.pfpInfo.contentId} found`);

      await cloudinary.uploader.destroy(content.publicId);
      const cloudinaryResult = await cloudinary.uploader.upload(req.files.pfp.tempFilePath, {
        use_filename: true,
        folder: `InstaIV/Profile-pictures/${user.username}`,
      });

      content.contentUrl = cloudinaryResult.secure_url;
      content.publicId = cloudinaryResult.public_id;
      await content.save();

      user.pfpInfo.contentUrl = cloudinaryResult.secure_url;
      await user.save();

      url = cloudinaryResult.secure_url;
    } else {
      // Creates a pfp
      const cloudinaryResult = await cloudinary.uploader.upload(req.files.pfp.tempFilePath, {
        use_filename: true,
        folder: `InstaIV/Profile-pictures/${user.username}`,
      });

      const content = await contentModel.create({
        contentUrl: cloudinaryResult.secure_url,
        publicId: cloudinaryResult.public_id,
      });

      user.pfpInfo = { contentUrl: cloudinaryResult.secure_url, contentId: content._id };
      await user.save();

      url = cloudinaryResult.secure_url;
    }

    // Updates the linked pfp (i.e. contentUrl) for all of user's posts
    await postModel.updateMany({ "userInfo.userId": req.userInfo.userId }, { "userInfo.contentUrl": url });

    fs.unlinkSync(req.files.pfp.tempFilePath);
  }

  return res.status(StatusCodes.OK).json({ msg: "(Server message) Updated profile", data: { pfpInfo: user.pfpInfo } });
};

// ==============================================
// Followers/following
// ==============================================

export const getFollowers = async (req, res) => {
  const user = await userModel.findById(req.userInfo.userId);

  if (!user) throw new NotFoundError(`No user with id ${req.userInfo.userId} found`);

  res.status(StatusCodes.OK).json({
    msg: "(Server message) Retrieved user followers",
    data: { followers: user.followersInfo, count: user.followersInfo.length },
  });
};

export const getFollowing = async (req, res) => {
  const user = await userModel.findById(req.userInfo.userId);

  if (!user) throw new NotFoundError(`No user with id ${req.userInfo.userId} found`);

  res.status(StatusCodes.OK).json({
    msg: "(Server message) Retrieved user following",
    data: { following: user.followingInfo, count: user.followingInfo.length },
  });
};

export const followUser = async (req, res) => {
  if (req.userInfo.userId === req.params.id) throw new BadRequestError("Cannot follow yourself");

  const user = await userModel.findById(req.userInfo.userId);
  const followedUser = await userModel.findById(req.params.id);

  if (!user && !followedUser)
    throw new NotFoundError(`No users with ids ${req.userInfo.userId} and ${req.params.id} found`);
  else if (!user || !followedUser)
    throw new NotFoundError(`No user with id ${!user ? req.userInfo.userId : req.params.id} found`);
  else if (user.followingInfo.find((following) => following.userId.toString() === req.params.id))
    throw new BadRequestError("Already following this user");

  followedUser.followersInfo.push({
    contentUrl: user?.pfpInfo?.contentUrl ? user.pfpInfo.contentUrl : "",
    username: user.username,
    userId: req.userInfo.userId,
  });
  await followedUser.save();

  user.followingInfo.push({
    contentUrl: followedUser?.pfpInfo?.contentUrl ? followedUser.pfpInfo.contentUrl : "",
    username: followedUser.username,
    userId: req.params.id,
  });
  await user.save();

  res.status(StatusCodes.OK).json({ msg: "(Server message) Followed user" });
};

export const unfollowUser = async (req, res) => {
  if (req.userInfo.userId === req.params.id) throw new BadRequestError("Cannot follow yourself");

  const user = await userModel.findById(req.userInfo.userId);
  const unfollowedUser = await userModel.findById(req.params.id);

  if (!user && !unfollowedUser)
    throw new NotFoundError(`No users with ids ${req.userInfo.userId} and ${req.params.id} found`);
  else if (!user || !unfollowedUser)
    throw new NotFoundError(`No user with id ${!user ? req.userInfo.userId : req.params.id} found`);

  unfollowedUser.followersInfo = unfollowedUser.followersInfo.filter(
    (obj) => obj.userId.toString() !== req.userInfo.userId
  );
  await unfollowedUser.save();

  user.followingInfo = user.followingInfo.filter((obj) => obj.userId.toString() !== req.params.id);
  await user.save();

  res.status(StatusCodes.OK).json({ msg: "(Server message) Unfollowed user" });
};
