import { Router } from "express";
import {
  getAllUsers,
  getUserProfile,
  createUserProfilePicture,
  updateUserProfilePicture,
  getUserFollowers,
  getUserFollowing,
  followUser,
  unfollowUser,
} from "../controllers/userController.js";
import { validateParamId, validateCreateProfilePictureInput } from "../middleware/validationMiddleware.js";

const userRouter = Router();

userRouter.get("/", getAllUsers); // FIXME: For testing, delete later.

userRouter.post("/profile-picture", validateCreateProfilePictureInput, createUserProfilePicture);
userRouter.patch("/profile-picture", updateUserProfilePicture);

userRouter.get("/followers", getUserFollowers);
userRouter.get("/following", getUserFollowing);
userRouter.patch("/follow/:id", validateParamId, followUser);
userRouter.patch("/unfollow/:id", validateParamId, unfollowUser);

userRouter.get("/:id", validateParamId, getUserProfile);

export default userRouter;
