import express from "express";
import {
  getProfile,
  loginUser,
  registerUser,
  toggleWishlist,
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = express.Router();

router.post("/signup", asyncHandler(registerUser));
router.post("/login", asyncHandler(loginUser));
router.get("/me", protect, asyncHandler(getProfile));
router.put("/wishlist/:productId", protect, asyncHandler(toggleWishlist));

export default router;
