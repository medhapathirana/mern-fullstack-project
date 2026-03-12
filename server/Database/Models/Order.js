import mongoose from "mongoose";

// Define Order Schema
const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Assuming you have a User model for reference
      required: true,
    },
    items: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item", // Assuming you have an Item model for reference
        required: true,
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Shipped", "Delivered", "Cancelled"], // You can modify statuses
      default: "Pending",
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Create Order model
const Order = mongoose.model("Order", orderSchema);

export default Order;
