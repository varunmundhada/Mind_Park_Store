import crypto from "crypto";
import Razorpay from "razorpay";
import Product from "../models/Product.js";

const getRazorpayConfig = () => {
  const keyId = process.env.RAZORPAY_KEY_ID || "";
  const keySecret = process.env.RAZORPAY_KEY_SECRET || "";
  const currency = process.env.RAZORPAY_CURRENCY || "INR";
  return {
    keyId,
    keySecret,
    currency,
    enabled: Boolean(keyId && keySecret),
  };
};

const buildRazorpayClient = () => {
  const config = getRazorpayConfig();
  if (!config.enabled) return null;

  return new Razorpay({
    key_id: config.keyId,
    key_secret: config.keySecret,
  });
};

const buildReceipt = () =>
  `mps-${Date.now()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;

export const getPaymentConfig = async (req, res) => {
  const config = getRazorpayConfig();

  res.json({
    provider: "razorpay",
    enabled: config.enabled,
    keyId: config.keyId,
    currency: config.currency,
  });
};

export const createRazorpayOrder = async (req, res) => {
  const config = getRazorpayConfig();
  const razorpay = buildRazorpayClient();

  if (!config.enabled || !razorpay) {
    return res.status(503).json({ message: "Online payments are not configured" });
  }

  const { items = [], impactDonation = 0 } = req.body;

  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: "At least one item is required for payment" });
  }

  const productIds = items.map((item) => item.product);
  const products = await Product.find({ _id: { $in: productIds }, isActive: true });
  const productsById = new Map(products.map((product) => [product._id.toString(), product]));

  let itemsPrice = 0;

  for (const item of items) {
    const product = productsById.get(String(item.product));
    if (!product) {
      return res.status(400).json({ message: "A selected product is no longer available" });
    }

    const quantity = Number(item.quantity || 0);
    if (!quantity || quantity < 1) {
      return res.status(400).json({ message: `Invalid quantity selected for ${product.name}` });
    }

    if (product.countInStock < quantity) {
      return res
        .status(400)
        .json({ message: `${product.name} has only ${product.countInStock} item(s) left in stock` });
    }

    itemsPrice += product.price * quantity;
  }

  const amountInPaise = Math.round((itemsPrice + Number(impactDonation || 0)) * 100);

  if (amountInPaise <= 0) {
    return res.status(400).json({ message: "Amount must be greater than zero" });
  }

  const razorpayOrder = await razorpay.orders.create({
    amount: amountInPaise,
    currency: config.currency,
    receipt: buildReceipt(),
    notes: {
      userId: String(req.user?._id || ""),
    },
  });

  res.status(201).json({
    orderId: razorpayOrder.id,
    amount: razorpayOrder.amount,
    currency: razorpayOrder.currency,
  });
};

export const verifyRazorpayPayment = async (req, res) => {
  const config = getRazorpayConfig();

  if (!config.enabled) {
    return res.status(503).json({ message: "Online payments are not configured" });
  }

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return res.status(400).json({ message: "Payment verification payload is incomplete" });
  }

  const payload = `${razorpay_order_id}|${razorpay_payment_id}`;
  const expectedSignature = crypto
    .createHmac("sha256", config.keySecret)
    .update(payload)
    .digest("hex");

  const isValid =
    expectedSignature.length === razorpay_signature.length &&
    crypto.timingSafeEqual(Buffer.from(expectedSignature), Buffer.from(razorpay_signature));

  if (!isValid) {
    return res.status(400).json({ message: "Payment signature verification failed" });
  }

  res.json({ verified: true, transactionId: razorpay_payment_id });
};
