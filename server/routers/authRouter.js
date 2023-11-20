import { Router } from "express";

import { register } from "../controllers/authController.js";
import { validateRegisterInput } from "../middleware/validationMiddleware.js";

const router = Router();

router.route("/register").post(validateRegisterInput, register);
router.route("/login").post();
router.route("/logout").get();

export default router;
