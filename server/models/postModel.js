import mongoose from "mongoose";

const postContentSubSchema = mongoose.Schema({
  imageUrl: {
    type: String,
    required: [true, "Image url required"],
  },
  contentId: {
    type: mongoose.Types.ObjectId,
    ref: "Content",
    required: [true, "Content id required"],
  },
});

const postUserInfoSubSchema = mongoose.Schema({
  imageUrl: {
    type: String,
    required: [true, "Image url required"],
  },
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
});

const postSchema = mongoose.Schema({
  contentInfo: {
    type: postContentSubSchema,
    required: true,
  },
  userInfo: {
    type: postUserInfoSubSchema,
    required: true,
  },
  caption: {
    type: String,
    default: "",
  },
  numLikes: {
    type: Number,
    default: 0,
  },
  numSaves: {
    type: Number,
    default: 0,
  },
});

export default mongoose.model("Post", postSchema);
