import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../Database/models/User.js";

const router = express.Router();

// Register User
router.post("/", async (req, res) => {
  try {
    const { fullName, email, password, phoneNumber, postalCode, address, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ fullName, email, password: hashedPassword, phoneNumber, postalCode, address, role });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Login User
router.post("/Login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
      res.json({ token, role: user.role });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get User Details
router.get("/:id", async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Update User Details
  router.put("/:id", async (req, res) => {
    try {
      const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  

  export default router;
