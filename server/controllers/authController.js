import User from "../models/User.js";
import { generateToken } from "../utils/generateToken.js";

const formatUser = (user) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  avatar: user.avatar,
  wishlist: user.wishlist,
  token: generateToken(user._id),
});

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  const exists = await User.findOne({ email });
  if (exists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const user = await User.create({ name, email, password, role: "buyer" });
  res.status(201).json(formatUser(user));
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  res.json(formatUser(user));
};

export const getProfile = async (req, res) => {
  const user = await User.findById(req.user._id).populate("wishlist");
  res.json(user);
};

export const toggleWishlist = async (req, res) => {
  const user = await User.findById(req.user._id);
  const productId = req.params.productId;
  const exists = user.wishlist.some((item) => item.toString() === productId);

  user.wishlist = exists
    ? user.wishlist.filter((item) => item.toString() !== productId)
    : [...user.wishlist, productId];

  await user.save();
  const updated = await User.findById(req.user._id).populate("wishlist");
  res.json(updated.wishlist);
};
