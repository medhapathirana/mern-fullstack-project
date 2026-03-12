// Database/Connect.js
import mongoose from "mongoose";

const connectDB = async (url) => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.error("Database connection error:", error);
    throw error;
  }
};

export default connectDB;
