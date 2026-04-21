import StoryProfile from "../models/StoryProfile.js";

export const getProfiles = async (req, res) => {
  const profiles = await StoryProfile.find().sort({ createdAt: -1 });
  res.json(profiles);
};
