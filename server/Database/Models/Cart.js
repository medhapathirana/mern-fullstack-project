import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  itemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Item",
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
  },
});

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;
