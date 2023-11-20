import "express-async-errors";
import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { StatusCodes } from "http-status-codes";
import * as dotenv from "dotenv";

import authRouter from "./routers/authRouter.js";
import userRouter from "./routers/userRouter.js";
import postRouter from "./routers/postRouter.js";
import errorMiddleware from "./middleware/errorMiddleware.js";
import { validateUser } from "./middleware/validationMiddleware.js";

// ==============================================
// Initialization
// ==============================================

dotenv.config();
const app = express();
const port = process.env.PORT || 5100;

// ==============================================
// Middleware
// ==============================================

if (process.env.NODE_ENV === "development") app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

// ==============================================
// Routes
// ==============================================

app.get("/", (req, res) => {
  res.status(StatusCodes.OK).json({ msg: "(Server message) Home route" });
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", validateUser, userRouter);
app.use("/api/v1/posts", validateUser, postRouter);

app.use("*", (req, res) => {
  res.status(StatusCodes.NOT_FOUND).json({ msg: "(Server message) Route not found" });
});

app.use(errorMiddleware);

// ==============================================
// Server initialization
// ==============================================

try {
  await mongoose.connect(process.env.MONGO_URI);
  app.listen(port, () => {
    console.log(`(Server message) Server is listening on port ${port}`);
  });
} catch (error) {
  console.error(error);
  process.exit(1);
}
