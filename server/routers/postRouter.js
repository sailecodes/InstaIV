import { Router } from "express";

import {
  validateParamId,
  validateCreatePostInput,
  validateUpdatePostInput,
  validateUpdateStatInput,
} from "../middleware/validationMiddleware.js";
import {
  getAllPosts,
  createPost,
  getPost,
  updatePost,
  deletePost,
  updateLikeCount,
  updateSaveCount,
} from "../controllers/postController.js";

const postRouter = Router();

postRouter.route("/").get(getAllPosts).post(validateCreatePostInput, createPost);

postRouter.route("/:id/like").patch(validateParamId, validateUpdateStatInput, updateLikeCount);
postRouter.route("/:id/save").patch(validateParamId, validateUpdateStatInput, updateSaveCount);

postRouter
  .route("/:id")
  .get(validateParamId, getPost)
  .patch(validateParamId, validateUpdatePostInput, updatePost)
  .delete(validateParamId, deletePost);

export default postRouter;
