import express from "express";
import User from "../Database/Models/User.js";  // Importing the User model

const router = express.Router();

// Get User Details
router.get("/profile", async (req, res) => {
  try {
    // Assuming the user is authenticated and we have the user's ID from the session or token
    const user = await User.findById(req.user._id);  // req.user._id should be populated with the logged-in user's ID
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);  // Send user details to the frontend
  } catch (err) {
    res.status(500).json({ message: "Error fetching user details" });
  }
});

// Update User Details
router.put("/profile", async (req, res) => {
  try {
    const { fullName, email, phoneNumber, postalCode, address, password } = req.body;
    
    // Assuming the user is authenticated and we have the user's ID
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,  // The user's ID
      { fullName, email, phoneNumber, postalCode, address, password },  // Fields to be updated
      { new: true }  // Return the updated user object
    );
    
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(updatedUser);  // Send the updated user details
  } catch (err) {
    res.status(500).json({ message: "Error updating user details" });
  }
});

export default router;
