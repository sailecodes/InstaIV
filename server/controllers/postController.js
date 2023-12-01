import fs from "fs";
import { v2 as cloudinary } from "cloudinary";
import { StatusCodes } from "http-status-codes";

import contentModel from "../models/contentModel.js";
import postModel from "../models/postModel.js";
import userModel from "../models/userModel.js";
import { NotFoundError, UnauthorizedError } from "../custom-errors/customErrors.js";

// ==============================================
// General CRUDs
// ==============================================

// TODO: Must dynamically change the profile picture for home posts, i.e. whenever the profile picture changes,
//       so should the profile picture in corresponding home posts
export const getAllPosts = async (req, res) => {
  const posts = await postModel.find({});

  res
    .status(StatusCodes.OK)
    .json({ msg: "(Server message) All posts retrieved", data: { posts, count: posts.length } });
};

export const createPost = async (req, res) => {
  const user = await userModel.findById(req.userInfo.userId);

  if (!user) throw new NotFoundError(`User with id ${req.userInfo.userId} not found`);

  const cloudinaryResult = await cloudinary.uploader.upload(req.files.content.tempFilePath, {
    use_filename: true,
    folder: "InstaIV/Posts",
  });

  const content = await contentModel.create({
    imageUrl: cloudinaryResult.secure_url,
    publicId: cloudinaryResult.public_id,
  });
  const post = await postModel.create({
    contentInfo: {
      imageUrl: cloudinaryResult.secure_url,
      contentId: content._id,
    },
    userInfo: {
      imageUrl: user?.profilePictureInfo?.imageUrl ? user.profilePictureInfo.imageUrl : "",
      username: user.username,
      userId: user._id,
    },
    caption: req.body.caption,
  });

  user.postsInfo.push({ imageUrl: cloudinaryResult.secure_url, contentId: content._id, postId: post._id });
  user.numPosts += 1;
  await user.save();

  fs.unlinkSync(req.files.content.tempFilePath);

  res.status(StatusCodes.CREATED).json({ msg: "(Server message) Post created" });
};

export const getPost = async (req, res) => {
  const user = await userModel.findById(req.userInfo.userId);

  // Note: Nonexistent users shouldn't be able to interact with resources
  if (!user) throw new NotFoundError(`User with id ${req.userInfo.userId} not found`);

  const post = await postModel.findById(req.params.id);

  if (!post) throw new NotFoundError(`Post with id ${req.params.id} not found`);

  res.status(StatusCodes.OK).json({ msg: "(Server message) Post retrieved", data: post });
};

// TODO: Impl. client-side
export const updatePost = async (req, res) => {
  const user = await userModel.findById(req.userInfo.userId);

  if (!user) throw new NotFoundError(`User with id ${req.userInfo.userId} not found`);

  const post = await postModel.findById(req.params.id);

  // Note: Only the post owner can modify the resource if it exists
  if (!post) throw new NotFoundError(`Post with id ${req.params.id} not found`);
  else if (post.userInfo.userId.toString() !== req.userInfo.userId)
    throw new UnauthorizedError(`Not authorized to access this resource`);

  post.caption = req.body.caption;
  await post.save();

  res.status(StatusCodes.OK).json({ msg: "(Server message) Post updated" });
};

export const deletePost = async (req, res) => {
  const user = await userModel.findById(req.userInfo.userId);

  if (!user) throw new NotFoundError(`User with id ${req.userInfo.userId} not found`);

  const post = await postModel.findById(req.params.id);

  if (!post) throw new NotFoundError(`Post with id ${req.params.id} not found`);
  else if (post.userInfo.userId.toString() !== req.userInfo.userId)
    throw new UnauthorizedError(`Not authorized to access this resource`);

  const content = await contentModel.findById(post.contentInfo.contentId);

  if (!content) throw new NotFoundError(`Content with id ${post.contentInfo.contentId} not found`);

  const savers = Array.from(post.savesInfo.users.keys());

  // Removes post from saved collection of other users
  for (let i = 0; i < savers.length; i++) {
    const saver = await userModel.findById(savers[i]);
    saver.savedPostsInfo = saver.savedPostsInfo.filter((postInfo) => postInfo.postId.toString() !== req.params.id);
    await saver.save();
  }

  user.postsInfo = user.postsInfo.filter((postInfo) => postInfo.postId.toString() !== req.params.id);
  user.savedPostsInfo = user.savedPostsInfo.filter((postInfo) => postInfo.postId.toString() !== req.params.id);
  user.numPosts -= 1;
  await user.save();

  await cloudinary.uploader.destroy(content.publicId);
  await postModel.findByIdAndDelete(req.params.id);
  await contentModel.findByIdAndDelete(content._id);

  res.status(StatusCodes.OK).json({ msg: "(Server message) Post deleted" });
};

// ==============================================
// Likes and saves
// ==============================================

export const updateLikeCount = async (req, res) => {
  const post = await postModel.findById(req.params.id);

  if (!post) throw new NotFoundError(`Post with id ${req.params.id} not found`);

  if (req.body.statFlag) {
    post.likesInfo.num += 1;
    post.likesInfo.users.set(req.userInfo.userId, true);
  } else {
    post.likesInfo.num = post.likesInfo.num === 0 ? 0 : post.likesInfo.num - 1;
    post.likesInfo.users.delete(req.userInfo.userId);
  }

  await post.save();

  res.status(StatusCodes.OK).json({ msg: "(Server message) Number of likes updated" });
};

export const updateSaveCount = async (req, res) => {
  const user = await userModel.findById(req.userInfo.userId);

  if (!user) throw new NotFoundError(`User with id ${req.userInfo.userId} not found`);

  const post = await postModel.findById(req.params.id);

  if (!post) throw new NotFoundError(`Post with id ${req.params.id} not found`);

  if (req.body.statFlag) {
    post.savesInfo.num += 1;
    post.savesInfo.users.set(req.userInfo.userId, true);
    user.savedPostsInfo.push({
      imageUrl: post.contentInfo.imageUrl,
      contentId: post.contentInfo.contentId,
      postId: post._id,
    });
  } else {
    post.savesInfo.num = post.savesInfo.num === 0 ? 0 : post.savesInfo.num - 1;
    post.savesInfo.users.delete(req.userInfo.userId);
    user.savedPostsInfo = user.savedPostsInfo.filter(
      (savedPost) => savedPost.postId.toString() !== post._id.toString()
    );
  }

  await post.save();
  await user.save();

  res.status(StatusCodes.OK).json({ msg: "(Server message) Number of saves updated" });
};
