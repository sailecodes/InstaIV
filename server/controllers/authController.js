import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";

import userModel from "../models/userModel.js";
import { UnauthenticatedError } from "../custom-errors/customErrors.js";
import { COOKIE_EXPIRATION } from "../utilities/constants.js";

export const register = async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  req.body.password = await bcrypt.hash(req.body.password, salt);

  await userModel.create(req.body);

  res.status(StatusCodes.CREATED).json({ msg: "(Server message) User registered" });
};

export const login = async (req, res) => {
  const loggedUser = await userModel.findOne({ email: req.body.email });

  if (!loggedUser) throw new UnauthenticatedError(`User with email '${req.body.email}' not found`);

  const isCorrectPassword = await bcrypt.compare(req.body.password, loggedUser.password);

  if (!isCorrectPassword) throw new UnauthenticatedError("Password is incorrect");

  const token = jwt.sign({ userId: loggedUser._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRATION,
  });

  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + COOKIE_EXPIRATION),
    secure: process.env.NODE_ENV === "production",
  });

  res.status(StatusCodes.OK).json({ msg: "(Server message) User logged in", data: loggedUser });
};

export const logout = (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });

  res.status(StatusCodes.OK).json({ msg: "(Server message) User logged out" });
};
