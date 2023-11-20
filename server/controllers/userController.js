import { StatusCodes } from "http-status-codes";
import userModel from "../models/userModel.js";

export const getProfileInfo = async (req, res) => {
  const user = await userModel.findById(req.userInfo.userId).select("-_id -email -password -chats -__v");

  res.status(StatusCodes.OK).json({ msg: "(Server message) Retrieved user info", data: user });
};

export const getFollowers = async (req, res) => {
  const { followers } = await userModel.findById(req.userInfo.userId);

  res.status(StatusCodes.OK).json({ msg: "(Server message) Retrieved user followers", data: { followers } });
};

export const getFollowing = async (req, res) => {
  const { following } = await userModel.findById(req.userInfo.userId);

  res.status(StatusCodes.OK).json({ msg: "(Server message) Retrieved user following", data: { following } });
};
