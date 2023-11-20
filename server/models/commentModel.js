import mongoose from "mongoose";

const commentSchema = mongoose.Model({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  comment: {
    type: String,
  },
});

export default mongoose.model("Comment", commentSchema);
