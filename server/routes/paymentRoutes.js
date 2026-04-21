import express from "express";
import {
  createRazorpayOrder,
  getPaymentConfig,
  verifyRazorpayPayment,
} from "../controllers/paymentController.js";
import { protect } from "../middleware/authMiddleware.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = express.Router();

router.get("/config", protect, asyncHandler(getPaymentConfig));
router.post("/create-order", protect, asyncHandler(createRazorpayOrder));
router.post("/verify", protect, asyncHandler(verifyRazorpayPayment));

export default router;
