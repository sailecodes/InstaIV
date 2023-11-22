import fs from "fs";
import { v2 as cloudinary } from "cloudinary";
import { StatusCodes } from "http-status-codes";

import contentModel from "../models/contentModel.js";
import postModel from "../models/postModel.js";
import userModel from "../models/userModel.js";
import { NotFoundError } from "../custom-errors/customErrors.js";

// ==============================================
// General CRUDs
// ==============================================

export const getAllPosts = async (req, res) => {
  const posts = await postModel.find({});

  res
    .status(StatusCodes.OK)
    .json({ msg: "(Server message) Retrieved all posts", data: { posts, count: posts.length } });
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

  user.posts.push({ imageUrl: cloudinaryResult.secure_url, contentId: content._id, postId: post._id });
  await user.save();

  fs.unlinkSync(req.files.content.tempFilePath);

  res.status(StatusCodes.CREATED).json({ msg: "(Server message) Post created" });
};

export const updatePost = async (req, res) => {};

export const deletePost = async (req, res) => {};
