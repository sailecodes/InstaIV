import mongoose from "mongoose";

const userProfilePictureInfoSubSchema = mongoose.Schema({
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

const userFollowInfoSubSchema = mongoose.Schema({
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

const userPostsInfoSubSchema = mongoose.Schema({
  imageUrl: {
    type: String,
    required: [true, "Image url required"],
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

const userSchema = mongoose.Schema({
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  username: {
    type: String,
  },
  profilePictureInfo: {
    type: userProfilePictureInfoSubSchema,
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
    type: [userFollowInfoSubSchema],
    default: [],
  },
  followingInfo: {
    type: [userFollowInfoSubSchema],
    default: [],
  },
  postsInfo: {
    type: [userPostsInfoSubSchema],
    default: [],
  },
  savedPostsInfo: {
    type: [userPostsInfoSubSchema],
    default: [],
  },
  chats: {
    type: [{ type: mongoose.Types.ObjectId, ref: "Chat" }],
    default: [],
  },
});

export default mongoose.model("User", userSchema);
