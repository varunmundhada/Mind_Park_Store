import Order from "../models/Order.js";
import Product from "../models/Product.js";

const paymentStatuses = {
  "Cash on Delivery": "Cash on Delivery",
  "Online Payment": "Paid",
};

const buildOrderNumber = () => {
  const dateStamp = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const randomPart = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `MPS-${dateStamp}-${randomPart}`;
};

const buildTransactionId = () =>
  `TXN-${new Date().toISOString().replace(/[-:.TZ]/g, "").slice(0, 14)}-${Math.random()
    .toString(36)
    .slice(2, 8)
    .toUpperCase()}`;

export const createOrder = async (req, res) => {
  const { items = [], shippingAddress, paymentMethod = "Cash on Delivery" } = req.body;

  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: "At least one item is required to place an order" });
  }

  if (!shippingAddress?.fullName || !shippingAddress?.phone || !shippingAddress?.addressLine1) {
    return res.status(400).json({ message: "Shipping address is incomplete" });
  }

  const productIds = items.map((item) => item.product);
  const products = await Product.find({ _id: { $in: productIds }, isActive: true });
  const productsById = new Map(products.map((product) => [product._id.toString(), product]));

  const normalizedItems = [];
  let itemsPrice = 0;

  for (const item of items) {
    const product = productsById.get(String(item.product));

    if (!product) {
      return res.status(400).json({ message: `A selected product is no longer available` });
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

    normalizedItems.push({
      product: product._id,
      name: product.name,
      image: product.images?.[0],
      price: product.price,
      quantity,
    });

    itemsPrice += product.price * quantity;
  }

  for (const item of normalizedItems) {
    await Product.findByIdAndUpdate(item.product, { $inc: { countInStock: -item.quantity } });
  }

  const impactDonation = Number(req.body.impactDonation || 0);
  const totalPrice = itemsPrice + impactDonation;
  const orderNumber = buildOrderNumber();
  const transactionId =
    paymentMethod === "Online Payment" ? req.body.transactionId || buildTransactionId() : undefined;
  const paymentStatus = paymentStatuses[paymentMethod] || "Pending";

  const order = await Order.create({
    user: req.user._id,
    orderNumber,
    items: normalizedItems,
    shippingAddress,
    paymentMethod,
    paymentStatus,
    transactionId,
    itemsPrice,
    impactDonation,
    totalPrice,
    status: "Placed",
    statusTimeline: [
      {
        status: "Placed",
        note: "Order received by Mind Park Store",
        updatedBy: "system",
      },
    ],
    deliveryPartner: "Porter",
    porterDetails: {
      bookingId: "",
      porterName: "",
      porterPhone: "",
      vehicleNumber: "",
      appLink: "",
    },
    deliveryLiability: "Mind Park Foundation",
  });

  res.status(201).json(order);
};

export const getMyOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(orders);
};

export const getAllOrders = async (req, res) => {
  const orders = await Order.find()
    .populate("user", "name email")
    .sort({ createdAt: -1 });
  res.json(orders);
};

export const updateOrderStatus = async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }

  const actorRole = req.user?.role;
  const isShubharti = actorRole === "shubharti";
  const previousStatus = order.status;
  const nextStatus = req.body.status || order.status;
  const allowedShubhartiStatuses = [
    "Accepted",
    "Confirmed",
    "Packed",
    "Dispatched",
    "Out for Delivery",
    "Delivered",
    "Cancelled",
  ];

  if (isShubharti && req.body.status && !allowedShubhartiStatuses.includes(req.body.status)) {
    return res.status(403).json({ message: "Shubharti role cannot set this order status" });
  }

  order.status = nextStatus;

  if (!isShubharti) {
    order.paymentStatus = req.body.paymentStatus || order.paymentStatus;
    order.deliveryPartner = req.body.deliveryPartner || order.deliveryPartner;
    order.transactionId =
      req.body.transactionId !== undefined ? req.body.transactionId || undefined : order.transactionId;
  }

  if (req.body.porterFare !== undefined) {
    order.porterFare = Math.max(0, Number(req.body.porterFare || 0));
  }

  order.porterTrackingId =
    req.body.porterTrackingId !== undefined ? req.body.porterTrackingId : order.porterTrackingId;
  const incomingPorterDetails = req.body.porterDetails || {};
  order.porterDetails = {
    bookingId:
      incomingPorterDetails.bookingId !== undefined
        ? incomingPorterDetails.bookingId
        : order.porterDetails?.bookingId || "",
    porterName:
      incomingPorterDetails.porterName !== undefined
        ? incomingPorterDetails.porterName
        : order.porterDetails?.porterName || "",
    porterPhone:
      incomingPorterDetails.porterPhone !== undefined
        ? incomingPorterDetails.porterPhone
        : order.porterDetails?.porterPhone || "",
    vehicleNumber:
      incomingPorterDetails.vehicleNumber !== undefined
        ? incomingPorterDetails.vehicleNumber
        : order.porterDetails?.vehicleNumber || "",
    appLink:
      incomingPorterDetails.appLink !== undefined
        ? incomingPorterDetails.appLink
        : order.porterDetails?.appLink || "",
  };

  if (req.body.porterTrackingId !== undefined && incomingPorterDetails.bookingId === undefined) {
    order.porterDetails.bookingId = req.body.porterTrackingId;
  }

  if (incomingPorterDetails.bookingId !== undefined) {
    order.porterTrackingId = incomingPorterDetails.bookingId;
  }

  if (!order.acceptedAt && req.body.status === "Accepted") {
    order.acceptedAt = new Date();
    order.acceptedBy = req.user?.name || "Shubharti Desk";
  }

  order.adminNotes = req.body.adminNotes !== undefined ? req.body.adminNotes : order.adminNotes;

  if (req.body.status && req.body.status !== order.statusTimeline.at(-1)?.status && req.body.status !== previousStatus) {
    order.statusTimeline.push({
      status: req.body.status,
      note: req.body.timelineNote || req.body.adminNotes || "",
      updatedBy: req.user?.name || (isShubharti ? "Shubharti Desk" : "Mind Park Admin"),
    });
  }

  const updated = await order.save();
  res.json(updated);
};
