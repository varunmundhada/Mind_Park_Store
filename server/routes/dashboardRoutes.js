import express from "express";
import { getDashboardStats } from "../controllers/dashboardController.js";
import { authorize, protect } from "../middleware/authMiddleware.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = express.Router();

router.get("/stats", protect, authorize("seller"), asyncHandler(getDashboardStats));

export default router;
