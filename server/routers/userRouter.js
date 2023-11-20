import { Router } from "express";
import { getFollowers, getFollowing, getProfileInfo } from "../controllers/userController.js";

const userRouter = Router();

userRouter.get("/user-profile", getProfileInfo);
userRouter.get("/followers", getFollowers);
userRouter.get("/following", getFollowing);

export default userRouter;
