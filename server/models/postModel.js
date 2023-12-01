import mongoose from "mongoose";

const postContentInfoSubSchema = mongoose.Schema({
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
    default: "",
  },
  username: {
    type: String,
    required: [true, "Username required"],
  },
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
});

const postStatInfoSubSchema = mongoose.Schema({
  users: {
    type: Map,
    of: String,
    default: {},
  },
  num: {
    type: Number,
    default: 0,
  },
});

const postSchema = mongoose.Schema(
  {
    contentInfo: {
      type: postContentInfoSubSchema,
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
    likesInfo: {
      type: postStatInfoSubSchema,
      default: {},
    },
    savesInfo: {
      type: postStatInfoSubSchema,
      default: {},
    },
  },
  { timestamps: true }
);

export default mongoose.model("Post", postSchema);
