import { StatusCodes } from "http-status-codes";
import userModel from "../models/userModel.js";

export const getProfileInfo = async (req, res) => {
  console.log(req.userInfo);

  const requestedUser = await userModel.findById(req.userInfo.userId).select("-_id -email -password -chats -__v");

  res.status(StatusCodes.OK).json({ msg: "(Server message) Retrieved user info", data: requestedUser });
};

export const getFollowers = async (req, res) => {};

export const getFollowing = async (req, res) => {};
