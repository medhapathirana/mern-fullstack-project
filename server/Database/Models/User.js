import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullName: String,
  email: { type: String, unique: true, required: true }, // Adding required validation
  password: { type: String, required: true }, // Ensure password is required
  phoneNumber: String,
  postalCode: String,
  address: String,
  role: { type: String, enum: ["admin", "customer"], default: "customer" }
});


// Create User model
const User = mongoose.model("User", userSchema);

export default User;
