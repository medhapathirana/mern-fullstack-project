import express from "express";
import Cart from "../Database/Models/Cart.js";  // Assuming you have a Cart model for cart operations
import { authenticate } from "../middleware/auth.js";

const router = express.Router();


router.use(authenticate);

// Get Cart Items
router.get("/cart", async (req, res) => {
  try {
    // Fetch cart items and populate the item details
    const cart = await Cart.find({ userId: req.user._id }).populate("itemId"); // Populate itemId to get item details
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: "Error fetching cart" });
  }
});

// Update Item Quantity in Cart
router.put("/cart/:id", async (req, res) => {
  try {
    // Update the quantity of a specific cart item
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      { $set: { quantity: req.body.quantity } },
      { new: true }
    );
    res.json(updatedCart);
  } catch (err) {
    res.status(500).json({ message: "Error updating cart item" });
  }
});

// Remove Item from Cart
router.delete("/cart/:id", async (req, res) => {
  try {
    // Remove a specific item from the cart
    await Cart.findByIdAndRemove(req.params.id);
    res.json({ message: "Item removed" });
  } catch (err) {
    res.status(500).json({ message: "Error removing cart item" });
  }
});

// Add Item to Cart
router.post("/cart", async (req, res) => {
  try {
    const { itemId, quantity } = req.body;

    // Check if the item is already in the cart
    const existingCartItem = await Cart.findOne({
      userId: req.user._id,
      itemId,
    });

    if (existingCartItem) {
      // If the item is already in the cart, update the quantity
      existingCartItem.quantity += quantity;
      await existingCartItem.save();
      return res.json(existingCartItem);
    }

    // Otherwise, create a new cart item
    const newCartItem = new Cart({
      userId: req.user._id,
      itemId,
      quantity,
    });

    await newCartItem.save();
    res.json(newCartItem);
  } catch (err) {
    res.status(500).json({ message: "Error adding to cart" });
  }
});


export default router;
