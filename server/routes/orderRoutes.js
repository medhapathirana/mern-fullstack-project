import express from "express";
import Order from "../Database/Models/Order.js";
const router = express.Router();

// Create Order
router.post("/", async (req, res) => {
  try {
    const { userId, items, totalPrice } = req.body;
    const newOrder = new Order({ userId, items, totalPrice, status: "Pending" });
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Orders for User
router.get("/:userId", async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Admin: Update Order Status
router.put("/:id", async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
