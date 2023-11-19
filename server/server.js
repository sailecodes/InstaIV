import "express-async-errors";
import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { StatusCodes } from "http-status-codes";
import * as dotenv from "dotenv";

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

app.use("/", (req, res) => {
  res.status(StatusCodes.OK).json({ msg: "(Server message) Home route" });
});

app.use("*", (req, res) => {
  res.status(StatusCodes.NOT_FOUND).json({ msg: "(Server message) Route not found" });
});

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
