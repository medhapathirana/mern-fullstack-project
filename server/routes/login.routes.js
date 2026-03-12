import express from "express";
import bcrypt from "bcryptjs";
import User from "../Database/Models/User.js";
import jwt from "jsonwebtoken";
const router = express.Router();

// Login Route
router.post('/', async (req, res) => {
  const { email, password } = req.body;

  console.log("Login request received with:", req.body);

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      console.log("❌ User not found");
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Compare the password with the stored hash
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("❌ Password mismatch");
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    console.log("JWT_SECRET value:", process.env.JWT_SECRET);

    // Generate a JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET, // 👈 ensure this is defined in your .env
      { expiresIn: '1h' }
    );

    console.log("✅ Login successful for:", user.email);

    // Send the token and user details as a response
    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    console.error("🔥 Server error:", err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
