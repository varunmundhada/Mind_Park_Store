import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    description: { type: String, required: true },
    story: { type: String, required: true },
    category: { type: String, required: true, trim: true },
    subcategory: { type: String, default: "", trim: true },
    sku: { type: String, trim: true, uppercase: true },
    price: { type: Number, required: true, min: 0 },
    countInStock: { type: Number, default: 0, min: 0 },
    featured: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    images: [{ type: String }],
    makerName: { type: String, required: true },
    impactSummary: { type: String, required: true },
    materials: [String],
    tags: [String],
    unitLabel: { type: String, default: "per item", trim: true },
    rating: { type: Number, default: 4.8 },
    reviewsCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
