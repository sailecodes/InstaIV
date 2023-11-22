import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { param, body, cookie, validationResult } from "express-validator";

import userModel from "../models/userModel.js";
import { BadRequestError, UnauthenticatedError } from "../custom-errors/customErrors.js";

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

export const validateParamId = validate([
  param("id")
    .custom((id) => mongoose.Types.ObjectId.isValid(id))
    .withMessage("No user with specified id found"),
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
    .withMessage("Password must be minimum 10 characters"),
  body("username")
    .notEmpty()
    .withMessage("Username required")
    .bail()
    .isLength({ max: 10 })
    .withMessage("Username must be maximum 10 characters")
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
    .withMessage("Password must be minimum 10 characters"),
]);

// ==============================================
// User routes validation
// ==============================================

export const validateCreateProfilePictureInput = validate([
  body("")
    .custom((_, { req, res }) => {
      // Note: Must use a custom validator for req.files since req.files is not currently supported
      //       by express-validator
      return req.files.profilePicture;
    })
    .withMessage("Image required")
    .bail()
    .custom((_, { req, res }) => {
      return req.files.profilePicture.mimetype.includes("image");
    })
    .withMessage("File type not supported"),
]);

// ==============================================
// Post routes validation
// ==============================================

export const validateCreatePostInput = validate([
  body("caption")
    .notEmpty()
    .withMessage("Caption required")
    .bail()
    .isLength({ max: 150 })
    .withMessage("Caption must be maximum 150 characters"),
  body("")
    .custom((_, { req, res }) => {
      return req.files.content;
    })
    .withMessage("Image required")
    .bail()
    .custom((_, { req, res }) => {
      return req.files.content.mimetype.includes("image");
    })
    .withMessage("File type not supported"),
]);
