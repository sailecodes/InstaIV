import { Router } from "express";
import {
  getAllUsers,
  getUserProfile,
  getOtherUserProfile,
  createUserProfilePicture,
  updateUserProfilePicture,
  getUserFollowers,
  getUserFollowing,
  followUser,
  unfollowUser,
} from "../controllers/userController.js";
import { validateParamId } from "../middleware/validationMiddleware.js";

const userRouter = Router();

userRouter.get("/", getAllUsers); // FIXME: For testing, delete later.

userRouter.get("/user", getUserProfile);
userRouter.get("/user/:id", validateParamId, getOtherUserProfile);

userRouter.post("/profile-pic", createUserProfilePicture);
userRouter.patch("/profile-pic", updateUserProfilePicture);

userRouter.get("/followers", getUserFollowers);
userRouter.get("/following", getUserFollowing);
userRouter.patch("/follow/:id", validateParamId, followUser);
userRouter.patch("/unfollow/:id", validateParamId, unfollowUser);

export default userRouter;
