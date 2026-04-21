import express from "express";
import { getProfiles } from "../controllers/contentController.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = express.Router();

router.get("/profiles", asyncHandler(getProfiles));

export default router;
