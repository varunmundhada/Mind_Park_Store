import express from "express";
import {
  createOrder,
  getAllOrders,
  getMyOrders,
  updateOrderStatus,
} from "../controllers/orderController.js";
import { authorize, protect } from "../middleware/authMiddleware.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = express.Router();

router.post("/", protect, asyncHandler(createOrder));
router.get("/mine", protect, asyncHandler(getMyOrders));
router.get("/", protect, authorize("seller", "shubharti"), asyncHandler(getAllOrders));
router.put("/:id", protect, authorize("seller", "shubharti"), asyncHandler(updateOrderStatus));

export default router;
