import mongoose from "mongoose";

const contentSchema = mongoose.Schema({
  publicId: {
    type: String,
    required: [true, "PublicId required"],
  },
  imageUrl: {
    type: String,
    required: [true, "ImageUrl required"],
  },
});

export default mongoose.model("Content", contentSchema);
