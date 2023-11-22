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

const postSchema = mongoose.Schema({
  contentInfo: {
    type: postContentSubSchema,
    required: true,
  },
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: [true, "User id required"],
  },
  caption: {
    type: String,
    default: "",
  },
  numLikes: {
    type: Number,
    default: 0,
  },
  comments: {
    type: [{ String, type: mongoose.Types.ObjectId, ref: "Comment" }],
    default: [],
  },
});

export default mongoose.model("Post", postSchema);
