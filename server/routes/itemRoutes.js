// import express from "express";
// import Item from "../Database/Models/Item.js"; // Ensure you include `.js`
// const router = express.Router();

// // Add Item
// router.post("/", async (req, res) => {
//   try {
//     const newItem = new Item(req.body);
//     await newItem.save();
//     res.status(201).json(newItem);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // Get All Items
// router.get("/", async (req, res) => {
//   try {
//     const items = await Item.find();
//     res.json(items);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // Update Item
// router.put("/:id", async (req, res) => {
//   try {
//     const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     res.json(updatedItem);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // Delete Item
// router.delete("/:id", async (req, res) => {
//   try {
//     await Item.findByIdAndDelete(req.params.id);
//     res.json({ message: "Item deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// export default router;


// C:\Users\medha\spero-app\server\Routes\itemRoutes.js

import express from 'express';
import { 
  addItem, 
  updateItem, 
  deleteItem, 
  getItems 
} from '../Controllers/itemController.js';
import Item from '../Database/Models/Item.js';


const router = express.Router();

// GET request to fetch all items
router.get("/", async (req, res) => {
  try {
    const items = await Item.find(); // Get all products from the database
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch products" });
  }
});
// POST request to add a new item
router.post("/", async (req, res) => {
  try {
    const { name, category, description, stock, price, image } = req.body;

    // Create new item and save to DB
    const newItem = new Item({
      name,
      category,
      description,
      stock,
      price,
      image,
    });

    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ message: "Failed to add product" });
  }
});

// PUT request to update an item
router.put("/:id", async (req, res) => {
  try {
    const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updatedItem);
  } catch (err) {
    console.error("PUT /api/items/:id failed:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE request to remove an item
router.delete("/:id", async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.json({ message: "Item deleted" });
  } catch (err) {
    console.error("DELETE /api/items/:id failed:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
