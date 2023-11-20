import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";

import userModel from "../models/userModel.js";

export const register = async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  req.body.password = await bcrypt.hash(req.body.password, salt);

  const registeredUser = await userModel.create(req.body);

  res.status(StatusCodes.CREATED).json({ msg: "(Server message) User registered", data: registeredUser });
};

export const login = (req, res) => {};

export const logout = (req, res) => {};
