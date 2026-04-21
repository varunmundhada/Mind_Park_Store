import dotenv from "dotenv";
import mongoose from "mongoose";
import { connectDb } from "../config/db.js";
import { products, profiles, users } from "../data/seedData.js";
import Order from "../models/Order.js";
import Product from "../models/Product.js";
import StoryProfile from "../models/StoryProfile.js";
import User from "../models/User.js";

dotenv.config();

const seed = async () => {
  await connectDb();

  await Promise.all([
    Order.deleteMany(),
    Product.deleteMany(),
    StoryProfile.deleteMany(),
    User.deleteMany(),
  ]);

  const createdUsers = [];
  for (const user of users) {
    const createdUser = await User.create(user);
    createdUsers.push(createdUser);
  }
  const createdProducts = await Product.insertMany(products);
  await StoryProfile.insertMany(profiles);

  await Order.create({
    user: createdUsers[1]._id,
    orderNumber: "MPS-SEEDED-0001",
    items: [
      {
        product: createdProducts[0]._id,
        name: createdProducts[0].name,
        image: createdProducts[0].images[0],
        price: createdProducts[0].price,
        quantity: 2,
      },
    ],
    shippingAddress: {
      fullName: "Supportive Buyer",
      email: "buyer@mindpark.org",
      phone: "9876543210",
      addressLine1: "12 Lake View Road",
      city: "Bengaluru",
      state: "Karnataka",
      postalCode: "560001",
    },
    paymentMethod: "Cash on Delivery",
    paymentStatus: "Cash on Delivery",
    itemsPrice: createdProducts[0].price * 2,
    impactDonation: 100,
    totalPrice: createdProducts[0].price * 2 + 100,
    status: "Confirmed",
    statusTimeline: [
      {
        status: "Placed",
        note: "Order received by Mind Park Store",
        updatedBy: "system",
      },
      {
        status: "Confirmed",
        note: "Mind Park team has confirmed this order",
        updatedBy: "Mind Park Admin",
      },
    ],
    deliveryPartner: "Porter",
    porterTrackingId: "PTR-DEMO-1001",
    adminNotes: "Packed for next-day local dispatch.",
    deliveryLiability: "Mind Park Foundation",
  });

  console.log("Seed data inserted");
  await mongoose.connection.close();
};

seed().catch(async (error) => {
  console.error(error);
  await mongoose.connection.close();
  process.exit(1);
});
