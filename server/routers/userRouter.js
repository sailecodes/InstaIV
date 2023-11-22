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

userRouter.get("/", getAllUsers); // TODO: For testing, delete later.

userRouter
  .route("/profile-picture")
  .post(validateProfilePictureInput, createProfilePicture)
  .patch(validateProfilePictureInput, updateProfilePicture);

userRouter.get("/followers", getFollowers);
userRouter.get("/following", getFollowing);
userRouter.patch("/follow/:id", validateParamId, followUser);
userRouter.patch("/unfollow/:id", validateParamId, unfollowUser);

userRouter.get("/:id", validateParamId, getProfile);

export default userRouter;
