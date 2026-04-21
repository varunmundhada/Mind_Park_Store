import express from "express";
import {
  adjustProductStock,
  createProduct,
  setProductPublishStatus,
  getAdminProducts,
  deleteProduct,
  getProductBySlug,
  getProducts,
  updateProduct,
} from "../controllers/productController.js";
import { authorize, protect } from "../middleware/authMiddleware.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = express.Router();

router.get("/", asyncHandler(getProducts));
router.get("/admin/catalog", protect, authorize("seller", "shubharti"), asyncHandler(getAdminProducts));
router.get("/:slug", asyncHandler(getProductBySlug));
router.post("/", protect, authorize("seller"), asyncHandler(createProduct));
router.put("/:id", protect, authorize("seller"), asyncHandler(updateProduct));
router.delete("/:id", protect, authorize("seller"), asyncHandler(deleteProduct));
router.patch("/:id/stock-adjust", protect, authorize("seller", "shubharti"), asyncHandler(adjustProductStock));
router.patch("/:id/publish", protect, authorize("seller"), asyncHandler(setProductPublishStatus));

export default router;
