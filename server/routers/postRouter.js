import { Router } from "express";

import {
  validateParamId,
  validateCreatePostInput,
  validateUpdatePostInput,
} from "../middleware/validationMiddleware.js";
import { getAllPosts, createPost, getPost, updatePost, deletePost } from "../controllers/postController.js";

const postRouter = Router();

postRouter.route("/").get(getAllPosts).post(validateCreatePostInput, createPost);

postRouter
  .route("/:id")
  .get(validateParamId, getPost)
  .patch(validateParamId, validateUpdatePostInput, updatePost)
  .delete(validateParamId, deletePost);

export default postRouter;
