import Product from "../models/Product.js";

const slugify = (value) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const normalizeList = (value) => {
  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim()).filter(Boolean);
  }

  if (typeof value === "string") {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
};

const buildImageList = (body, currentImages = []) => {
  if (Array.isArray(body.images) && body.images.length) {
    return body.images.map((item) => String(item).trim()).filter(Boolean);
  }

  if (typeof body.imageUrl === "string" && body.imageUrl.trim()) {
    return [body.imageUrl.trim()];
  }

  return currentImages;
};

const ensureUniqueSlug = async (baseSlug, excludeId) => {
  const cleanBase = slugify(baseSlug || "mindpark-product");
  let candidate = cleanBase;
  let suffix = 1;

  while (true) {
    const existing = await Product.findOne({
      slug: candidate,
      ...(excludeId ? { _id: { $ne: excludeId } } : {}),
    });

    if (!existing) {
      return candidate;
    }

    suffix += 1;
    candidate = `${cleanBase}-${suffix}`;
  }
};

export const getProducts = async (req, res) => {
  const { category, subcategory, search, minPrice, maxPrice, featured, inStock } = req.query;
  const filter = { isActive: true };

  if (category && category !== "All") filter.category = category;
  if (subcategory && subcategory !== "All") filter.subcategory = subcategory;
  if (featured) filter.featured = featured === "true";
  if (search) filter.name = { $regex: search, $options: "i" };
  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$lte = Number(maxPrice);
  }
  if (inStock === "true") {
    filter.countInStock = { $gt: 0 };
  }

  const products = await Product.find(filter).sort({ createdAt: -1 });
  res.json(products);
};

export const getAdminProducts = async (req, res) => {
  const products = await Product.find().sort({ createdAt: -1 });
  res.json(products);
};

export const getProductBySlug = async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug, isActive: true });

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.json(product);
};

export const createProduct = async (req, res) => {
  const slug = await ensureUniqueSlug(req.body.slug || req.body.name);
  const payload = {
    ...req.body,
    slug,
    category: String(req.body.category || "").trim(),
    subcategory: String(req.body.subcategory || "").trim(),
    images: buildImageList(req.body),
    materials: normalizeList(req.body.materials),
    tags: normalizeList(req.body.tags),
    unitLabel: String(req.body.unitLabel || "per item").trim(),
    price: Number(req.body.price || 0),
    countInStock: Number(req.body.countInStock || 0),
    featured: Boolean(req.body.featured),
    isActive: req.body.isActive !== false,
    sku: req.body.sku ? String(req.body.sku).trim().toUpperCase() : undefined,
  };

  const product = await Product.create(payload);
  res.status(201).json(product);
};

export const updateProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  const nextName = req.body.name || product.name;
  const nextSlug = await ensureUniqueSlug(req.body.slug || nextName, product._id);

  Object.assign(product, {
    ...req.body,
    slug: nextSlug,
    category: String(req.body.category || product.category).trim(),
    subcategory:
      req.body.subcategory !== undefined
        ? String(req.body.subcategory || "").trim()
        : product.subcategory,
    images: buildImageList(req.body, product.images),
    materials:
      req.body.materials !== undefined ? normalizeList(req.body.materials) : product.materials,
    tags: req.body.tags !== undefined ? normalizeList(req.body.tags) : product.tags,
    unitLabel:
      req.body.unitLabel !== undefined ? String(req.body.unitLabel).trim() : product.unitLabel,
    price: req.body.price !== undefined ? Number(req.body.price) : product.price,
    countInStock:
      req.body.countInStock !== undefined ? Number(req.body.countInStock) : product.countInStock,
    featured: req.body.featured !== undefined ? Boolean(req.body.featured) : product.featured,
    isActive: req.body.isActive !== undefined ? Boolean(req.body.isActive) : product.isActive,
    sku: req.body.sku !== undefined ? String(req.body.sku || "").trim().toUpperCase() : product.sku,
  });

  const updated = await product.save();
  res.json(updated);
};

export const deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  await product.deleteOne();
  res.json({ message: "Product removed" });
};

export const adjustProductStock = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  const delta = Number(req.body.delta || 0);
  if (!Number.isFinite(delta) || delta === 0) {
    return res.status(400).json({ message: "A non-zero stock delta is required" });
  }

  const nextStock = Math.max(0, Number(product.countInStock || 0) + delta);
  product.countInStock = nextStock;

  const updated = await product.save();
  res.json(updated);
};

export const setProductPublishStatus = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  if (req.body.isActive === undefined) {
    return res.status(400).json({ message: "isActive is required" });
  }

  product.isActive = Boolean(req.body.isActive);

  if (req.body.featured !== undefined) {
    product.featured = Boolean(req.body.featured);
  }

  const updated = await product.save();
  res.json(updated);
};
