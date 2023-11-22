import { Router } from "express";

import { validateCreatePostInput, validateParamId } from "../middleware/validationMiddleware.js";
import { createPost, deletePost, getAllPosts, updatePost } from "../controllers/postController.js";

const postRouter = Router();

postRouter.route("/").get(getAllPosts).post(validateCreatePostInput, createPost);
postRouter.route("/:id").patch(validateParamId, updatePost).delete(validateParamId, deletePost);

export default postRouter;
