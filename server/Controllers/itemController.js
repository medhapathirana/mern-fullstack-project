// C:\Users\medha\spero-app\server\Controllers\itemController.js

import Item from "../Database/Models/Item.js";

// Get all items
export const getItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving items", error });
  }
};

// Add a new item
export const addItem = async (req, res) => {
  const { name, category, type, description, stock, price, image } = req.body;
  
  const newItem = new Item({
    name,
    category,
    type,
    description,
    stock,
    price,
    image
  });

  try {
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(500).json({ message: "Error adding item", error });
  }
};

// Update an existing item
export const updateItem = async (req, res) => {
  const { id } = req.params;
  const { name, category, type, description, stock, price, image } = req.body;

  try {
    const updatedItem = await Item.findByIdAndUpdate(id, { 
      name, 
      category, 
      type, 
      description, 
      stock, 
      price, 
      image 
    }, { new: true });

    if (!updatedItem) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(500).json({ message: "Error updating item", error });
  }
};

// Delete an item
export const deleteItem = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedItem = await Item.findByIdAndDelete(id);

    if (!deletedItem) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting item", error });
  }
};
