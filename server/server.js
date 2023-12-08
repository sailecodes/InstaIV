import "express-async-errors";
import express from "express";
import url from "url";
import path from "path";
import mongoose from "mongoose";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import cors from "cors";
import helmet from "helmet";
import ExpressMongoSanitize from "express-mongo-sanitize";
import { v2 as cloudinary } from "cloudinary";
import { StatusCodes } from "http-status-codes";
import * as dotenv from "dotenv";

import authRouter from "./routers/authRouter.js";
import userRouter from "./routers/userRouter.js";
import postRouter from "./routers/postRouter.js";
import errorMiddleware from "./middleware/errorMiddleware.js";
import { validateUser } from "./middleware/validationMiddleware.js";
import { dirname } from "path";

// ==============================================
// Initialization
// ==============================================

dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});
const app = express();
const port = process.env.PORT || 5100;
const __dirname = dirname(url.fileURLToPath(import.meta.url));

// ==============================================
// Middleware
// ==============================================

if (process.env.NODE_ENV === "development") app.use(morgan("dev"));
app.use(express.static(path.resolve(__dirname, "./public")));
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload({ useTempFiles: true }));
app.use(cors());
app.use(helmet());
// FIXME: Temporary fix for `Refused to load the image '<URL>' because it violates
//        the following Content Security Policy directive: "img-src 'self' data:"`
app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      "img-src": ["'self'", "https: data: blob:"],
    },
  })
);
app.use(ExpressMongoSanitize());

// ==============================================
// Routes
// ==============================================

app.get("/", (req, res) => {
  res.status(StatusCodes.OK).json({ msg: "(Server message) Home route" });
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", validateUser, userRouter);
app.use("/api/v1/posts", validateUser, postRouter);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./public", "index.html"));
});

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
