import mongoose from "mongoose";

const contentInfoSubSchema = mongoose.Schema({
  contentUrl: {
    type: String,
    required: [true, "Image url required"],
  },
  contentId: {
    type: mongoose.Types.ObjectId,
    ref: "Content",
    required: [true, "Content id required"],
  },
});

const userInfoSubSchema = mongoose.Schema({
  contentUrl: {
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

const statInfoSubSchema = mongoose.Schema({
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
      type: contentInfoSubSchema,
      required: true,
    },
    userInfo: {
      type: userInfoSubSchema,
      required: true,
    },
    caption: {
      type: String,
      default: "",
    },
    likesInfo: {
      type: statInfoSubSchema,
      default: {},
    },
    savesInfo: {
      type: statInfoSubSchema,
      default: {},
    },
  },
  { timestamps: true }
);

export default mongoose.model("Post", postSchema);
