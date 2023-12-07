import mongoose from "mongoose";

const pfpInfoSubSchema = mongoose.Schema({
  contentUrl: {
    type: String,
    default: "",
  },
  contentId: {
    type: mongoose.Types.ObjectId,
    ref: "Content",
    required: [true, "Content id required"],
  },
});

const followInfoSubSchema = mongoose.Schema({
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
    required: [true, "User id required"],
  },
});

const postsInfoSubSchema = mongoose.Schema({
  contentUrl: {
    type: String,
    default: "",
  },
  contentId: {
    type: mongoose.Types.ObjectId,
    ref: "Content",
    required: [true, "Content id required"],
  },
  postId: {
    type: mongoose.Types.ObjectId,
    ref: "Post",
    required: [true, "Post id required"],
  },
});

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    username: {
      type: String,
    },
    pfpInfo: {
      type: pfpInfoSubSchema,
    },
    bio: {
      type: String,
      default: "",
    },
    numPosts: {
      type: Number,
      default: 0,
    },
    followersInfo: {
      type: [followInfoSubSchema],
      default: [],
    },
    followingInfo: {
      type: [followInfoSubSchema],
      default: [],
    },
    postsInfo: {
      type: [postsInfoSubSchema],
      default: [],
    },
    savedPostsInfo: {
      type: [postsInfoSubSchema],
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
