import { Router } from "express";
import {
  getAllUsers,
  getUserFollowers,
  getUserFollowing,
  getUserProfile,
  followUser,
  unfollowUser,
  createUserProfilePic,
  updateUserProfilePic,
} from "../controllers/userController.js";
import { validateParamId } from "../middleware/validationMiddleware.js";

const userRouter = Router();

userRouter.get("/", getAllUsers); // FIXME: For testing, delete later.

userRouter.get("/user-profile", getUserProfile);

userRouter.post("/profile-pic", createUserProfilePic);
userRouter.patch("/profile-pic", updateUserProfilePic);

userRouter.get("/followers", getUserFollowers);
userRouter.get("/following", getUserFollowing);
userRouter.patch("/follow/:id", validateParamId, followUser);
userRouter.patch("/unfollow/:id", validateParamId, unfollowUser);

export default userRouter;
