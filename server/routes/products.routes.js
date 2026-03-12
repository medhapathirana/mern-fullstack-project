import express from "express";
import Product from "../models/Product.js"; // Assuming Product model is set up
const router = express.Router();

// Fetch all products
router.get("/products", async (req, res) => {
  try {
    const products = await Product.find(); // Fetch products from MongoDB
    res.json(products); // Send products as response
  } catch (err) {
    res.status(500).json({ message: "Error fetching products" });
  }
});

export default router;
