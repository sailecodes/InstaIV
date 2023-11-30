import { Router } from "express";
import {
  getAllUsers,
  getProfile,
  updateProfile,
  getFollowers,
  getFollowing,
  followUser,
  unfollowUser,
} from "../controllers/userController.js";
import { validateParamId, validateUpdateProfileInput } from "../middleware/validationMiddleware.js";

const userRouter = Router();

userRouter.get("/", getAllUsers);

userRouter.get("/followers", getFollowers);
userRouter.get("/following", getFollowing);
userRouter.patch("/follow/:id", validateParamId, followUser);
userRouter.patch("/unfollow/:id", validateParamId, unfollowUser);

userRouter
  .route("/:id")
  .get(validateParamId, getProfile)
  .patch(validateParamId, validateUpdateProfileInput, updateProfile);

export default userRouter;
