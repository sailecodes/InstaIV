import { Router } from "express";
import {
  getAllUsers,
  getFollowers,
  getFollowing,
  getUserProfile,
  followUser,
  unfollowUser,
} from "../controllers/userController.js";
import { validateParamId } from "../middleware/validationMiddleware.js";

const userRouter = Router();

userRouter.get("/", getAllUsers);
userRouter.get("/user-profile", getUserProfile);
userRouter.get("/followers", getFollowers);
userRouter.get("/following", getFollowing);
userRouter.patch("/follow/:id", validateParamId, followUser);
userRouter.patch("/unfollow/:id", validateParamId, unfollowUser);

export default userRouter;
