import { Router } from "express";

import {
  validateCreatePostInput,
  validateParamId,
  validateUpdatePostInput,
} from "../middleware/validationMiddleware.js";
import { createPost, deletePost, getAllPosts, updatePost } from "../controllers/postController.js";

const postRouter = Router();

postRouter.route("/").get(getAllPosts).post(validateCreatePostInput, createPost);
postRouter
  .route("/:id")
  .patch(validateParamId, validateUpdatePostInput, updatePost)
  .delete(validateParamId, deletePost);

export default postRouter;
