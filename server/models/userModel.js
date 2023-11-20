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
  bio: {
    type: String,
  },
  numPosts: {
    type: Number,
  },
  followers: {
    type: [{ type: mongoose.Types.ObjectId, ref: "User" }],
  },
  following: {
    type: [{ type: mongoose.Types.ObjectId, ref: "User" }],
  },
  posts: {
    type: [{ type: mongoose.Types.ObjectId, ref: "Post" }],
  },
  savedPosts: {
    type: [{ type: mongoose.Types.ObjectId, ref: "Post" }],
  },
  chats: {
    type: [{ type: mongoose.Types.ObjectId, ref: "Chat" }],
  },
});

export default mongoose.model("User", userSchema);
