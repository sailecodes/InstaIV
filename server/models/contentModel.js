import mongoose from "mongoose";

const contentSchema = mongoose.Schema({
  imageUrl: {
    type: String,
    required: [true, "Image url required"],
  },
  publicId: {
    type: String,
    required: [true, "Public id required"],
  },
});

export default mongoose.model("Content", contentSchema);
