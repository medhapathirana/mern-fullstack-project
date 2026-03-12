import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  type: String,
  description: String,
  stock: Number,
  price: Number,
  image: String,
});

const Item = mongoose.model("Item", itemSchema);

export default Item;
