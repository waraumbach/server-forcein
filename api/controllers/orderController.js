import OrderModel from "../models/orderModel.js";
import User from "../models/userModel.js";

const createOrder = async (req, res) => {
  try {
    const { products, token, address } = req.body;

    const user = await User.findOne({ token });

    const newOrder = await OrderModel.create({
      products,
      userId: user._id,
      address,
    });

    res.status(201).json(newOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getOrders = async (req, res) => {
  try {
    const { userId } = req.params;

    const orders = await OrderModel.find({ userId }).populate(
      "products.productId"
    );

    if (orders.length === 0) {
      return res.status(404).json({ message: "No orders found for this user" });
    }

    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export { createOrder, getOrders };
