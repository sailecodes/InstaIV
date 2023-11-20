import { param, body, cookie, validationResult } from "express-validator";

import userModel from "../models/userModel.js";
import { BadRequestError } from "../custom-errors/customErrors.js";

const validate = (validationValues) => {
  return [
    validationValues,
    (req, res, next) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);

        throw new BadRequestError(errorMessages);
      }

      next();
    },
  ];
};

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
