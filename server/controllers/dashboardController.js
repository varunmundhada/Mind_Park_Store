import Order from "../models/Order.js";
import Product from "../models/Product.js";
import StoryProfile from "../models/StoryProfile.js";
import User from "../models/User.js";

export const getDashboardStats = async (req, res) => {
  const [products, activeProducts, lowStockProducts, orders, profiles, buyers] = await Promise.all([
    Product.countDocuments(),
    Product.countDocuments({ isActive: true }),
    Product.countDocuments({ countInStock: { $lte: 5 } }),
    Order.find(),
    StoryProfile.countDocuments(),
    User.countDocuments({ role: "buyer" }),
  ]);

  const revenue = orders.reduce((sum, order) => sum + (order.totalPrice || 0), 0);

  res.json({
    products,
    activeProducts,
    lowStockProducts,
    orders: orders.length,
    pendingDispatch: orders.filter((order) =>
      ["Placed", "Confirmed", "Packed"].includes(order.status)
    ).length,
    profiles,
    buyers,
    revenue,
    impact: {
      supportedPeople: 74,
      therapyHours: 1280,
      cafeMealsServed: 620,
    },
  });
};
