import { Router } from "express";

import { validateCreatePostInput, validateParamId } from "../middleware/validationMiddleware.js";
import { createPost, deletePost, updatePost } from "../controllers/postController.js";

const postRouter = Router();

postRouter.post("/", validateCreatePostInput, createPost);
postRouter.route("/:id").patch(validateParamId, updatePost).delete(validateParamId, deletePost);

export default postRouter;
