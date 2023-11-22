import { Router } from "express";
import {
  getAllUsers,
  getProfile,
  createProfilePicture,
  updateProfilePicture,
  getFollowers,
  getFollowing,
  followUser,
  unfollowUser,
} from "../controllers/userController.js";
import { validateParamId, validateProfilePictureInput } from "../middleware/validationMiddleware.js";

const userRouter = Router();

userRouter.get("/", getAllUsers); // FIXME: For testing, delete later.

userRouter.post("/profile-picture", validateProfilePictureInput, createProfilePicture);
userRouter.patch("/profile-picture", validateProfilePictureInput, updateProfilePicture);

userRouter.get("/followers", getFollowers);
userRouter.get("/following", getFollowing);
userRouter.patch("/follow/:id", validateParamId, followUser);
userRouter.patch("/unfollow/:id", validateParamId, unfollowUser);

userRouter.get("/:id", validateParamId, getProfile);

export default userRouter;
