import { Router } from "express";
import { getFollowers, getFollowing, getUserProfile, followUser, unfollowUser } from "../controllers/userController.js";
import { validateFollowedUserId } from "../middleware/validationMiddleware.js";

const userRouter = Router();

userRouter.get("/user-profile", getUserProfile);
userRouter.get("/followers", getFollowers);
userRouter.get("/following", getFollowing);
userRouter.patch("/follow", validateFollowedUserId, followUser);
userRouter.patch("/unfollow", validateFollowedUserId, unfollowUser);

export default userRouter;
