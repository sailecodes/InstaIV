import jwt from "jsonwebtoken";
import { param, body, cookie, validationResult } from "express-validator";

import userModel from "../models/userModel.js";
import { BadRequestError, UnauthenticatedError } from "../custom-errors/customErrors.js";
import mongoose from "mongoose";

const validate = (validationValues) => {
  return [
    validationValues,
    (req, res, next) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);

        if (errorMessages[0].startsWith("Authentication")) throw new UnauthenticatedError("Authentication invalid.");
        else throw new BadRequestError(errorMessages);
      }

      next();
    },
  ];
};

// ==============================================
// General validation
// ==============================================

export const validateUser = validate([
  cookie("token").custom((token, { req, res }) => {
    if (!token) throw new UnauthenticatedError("Authentication invalid");

    try {
      const { userId } = jwt.verify(token, process.env.JWT_SECRET);

      if (!mongoose.Types.ObjectId.isValid(userId)) throw new UnauthenticatedError("Authentication invalid");

      req.userInfo = { userId };

      return true;
    } catch (error) {
      throw new UnauthenticatedError("Authentication invalid");
    }
  }),
]);

// ==============================================
// Authentication routes validation
// ==============================================

export const validateRegisterInput = validate([
  body("email")
    .isEmail()
    .withMessage("Email not valid")
    .bail()
    .custom(async (email) => {
      if (await userModel.findOne({ email })) throw new BadRequestError("Email already exists");
    }),
  body("password")
    .notEmpty()
    .withMessage("Password required")
    .bail()
    .isLength({ min: 10 })
    .withMessage("Password must be at least 10 characters"),
  body("username")
    .notEmpty()
    .withMessage("Username required")
    .bail()
    .custom(async (username) => {
      if (await userModel.findOne({ username })) throw new BadRequestError("Username already exists");
    }),
]);

export const validateLoginInput = validate([
  body("email").isEmail().withMessage("Email not valid"),
  body("password")
    .notEmpty()
    .withMessage("Password required")
    .bail()
    .isLength({ min: 10 })
    .withMessage("Password must be at least 10 characters"),
]);

// ==============================================
// User routes validation
// ==============================================

export const validateFollowedUserId = validate([
  body("followedUserId").custom((followedUserId) => {
    if (!mongoose.Types.ObjectId.isValid(followedUserId)) throw new UnauthenticatedError("Authentication invalid");

    return true;
  }),
]);
