import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  content: {
    type: mongoose.Types.ObjectId,
    ref: "Content",
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  description: {
    type: String,
    default: "",
  },
  numLikes: {
    type: Number,
    default: 0,
  },
  comments: {
    type: [{ type: mongoose.Types.ObjectId, ref: "Comment" }],
    default: [],
  },
});

export default mongoose.model("Post", postSchema);
