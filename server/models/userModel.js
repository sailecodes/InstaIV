import mongoose from "mongoose";

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
  profilePicture: {
    type: [String, { type: mongoose.Types.ObjectId, ref: "Content" }],
    default: [],
  },
  bio: {
    type: String,
    default: "",
  },
  numPosts: {
    type: Number,
    default: 0,
  },
  followers: {
    type: [{ type: mongoose.Types.ObjectId, ref: "User" }],
    default: [],
  },
  following: {
    type: [{ type: mongoose.Types.ObjectId, ref: "User" }],
    default: [],
  },
  posts: {
    type: [[String, { type: mongoose.Types.ObjectId, ref: "Post" }]],
    default: [],
  },
  savedPosts: {
    type: [{ type: mongoose.Types.ObjectId, ref: "Post" }],
    default: [],
  },
  chats: {
    type: [{ type: mongoose.Types.ObjectId, ref: "Chat" }],
    default: [],
  },
});

export default mongoose.model("User", userSchema);
