import { Router } from "express";

import { login, logout, register } from "../controllers/authController.js";
import { validateLoginInput, validateRegisterInput } from "../middleware/validationMiddleware.js";

const authRouter = Router();

authRouter.route("/register").post(validateRegisterInput, register);
authRouter.route("/login").post(validateLoginInput, login);
authRouter.route("/logout").get(logout);

export default authRouter;
