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
  body("email").isEmail().withMessage("Please provide an email"),
  body("password")
    .notEmpty()
    .withMessage("Please provide a password")
    .bail()
    .isLength({ min: 10 })
    .withMessage("Please provide a password at least 10 characters"),
  body("username")
    .notEmpty()
    .withMessage("Please provide a username")
    .bail()
    .custom(async (username) => {
      const userWithUsername = await userModel.findOne({ username });

      if (userWithUsername) throw new BadRequestError("Username already exists");
    }),
]);
