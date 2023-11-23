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
    userId: user._id,
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

export const updatePost = async (req, res) => {
  const user = await userModel.findById(req.userInfo.userId);

  if (!user) throw new NotFoundError(`User with id ${req.userInfo.userId} not found`);

  const post = await postModel.findById(req.params.id);

  // Note: Only the post owner can modify the resource if it exists
  if (!post) throw new NotFoundError(`Post with id ${req.params.id} not found`);
  else if (post.userId.toString() !== req.userInfo.userId)
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
  else if (post.userId.toString() !== req.userInfo.userId)
    throw new UnauthorizedError(`Not authorized to access this resource`);

  const content = await contentModel.findById(post.contentInfo.contentId);

  if (!content) throw new NotFoundError(`Content with id ${post.contentInfo.contentId} not found`);

  await cloudinary.uploader.destroy(content.publicId);
  await postModel.findByIdAndDelete(req.params.id);
  await contentModel.findByIdAndDelete(content._id);
  user.postsInfo = user.postsInfo.filter((postInfo) => req.params.id !== postInfo.postId.toString());
  user.numPosts -= 1;
  await user.save();

  res.status(StatusCodes.OK).json({ msg: "(Server message) Post deleted" });
};
