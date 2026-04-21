import mongoose from "mongoose";

const storyProfileSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },
    summary: { type: String, required: true },
    fullStory: { type: String, required: true },
    image: { type: String, required: true },
    tags: [String],
  },
  { timestamps: true }
);

export default mongoose.model("StoryProfile", storyProfileSchema);
