import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    name: String,
    image: String,
    price: Number,
    quantity: Number,
  },
  { _id: false }
);

const statusTimelineSchema = new mongoose.Schema(
  {
    status: { type: String, required: true },
    note: { type: String, default: "" },
    updatedBy: { type: String, default: "system" },
    timestamp: { type: Date, default: Date.now },
  },
  { _id: false }
);

const porterDetailsSchema = new mongoose.Schema(
  {
    bookingId: { type: String, default: "" },
    porterName: { type: String, default: "" },
    porterPhone: { type: String, default: "" },
    vehicleNumber: { type: String, default: "" },
    appLink: { type: String, default: "" },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    orderNumber: { type: String, required: true, unique: true, index: true },
    items: [orderItemSchema],
    shippingAddress: {
      fullName: String,
      email: String,
      phone: String,
      addressLine1: String,
      city: String,
      state: String,
      postalCode: String,
    },
    paymentMethod: {
      type: String,
      enum: ["Cash on Delivery", "Online Payment"],
      default: "Cash on Delivery",
    },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Cash on Delivery", "Failed", "Refunded"],
      default: "Pending",
    },
    transactionId: { type: String, unique: true, sparse: true },
    itemsPrice: { type: Number, default: 0 },
    impactDonation: { type: Number, default: 0 },
    totalPrice: { type: Number, default: 0 },
    status: {
      type: String,
      enum: [
        "Placed",
        "Accepted",
        "Confirmed",
        "Packed",
        "Dispatched",
        "Out for Delivery",
        "Delivered",
        "Cancelled",
      ],
      default: "Placed",
    },
    statusTimeline: [statusTimelineSchema],
    deliveryPartner: { type: String, default: "Porter" },
    porterTrackingId: { type: String, default: "" },
    porterDetails: { type: porterDetailsSchema, default: () => ({}) },
    porterFare: { type: Number, default: 0 },
    acceptedAt: { type: Date },
    acceptedBy: { type: String, default: "" },
    adminNotes: { type: String, default: "" },
    deliveryLiability: { type: String, default: "Mind Park Foundation" },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
