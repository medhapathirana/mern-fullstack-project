import express from "express";
import bcrypt from "bcryptjs";
import User from "../Database/Models/User.js";
const router = express.Router();

// Register User
router.post("/", async (req, res) => {
    console.log('Received registration data:', req.body);
  try {
    const { fullName, email, password, phoneNumber, postalCode, address, role } = req.body;

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = new User({ fullName, email, password: hashedPassword, phoneNumber, postalCode, address, role });
    await newUser.save();
    
    res.status(200).json({
        status: 'success',
        data: {
            newUser
        }
    });
} catch (err) {
    let errorMessage;

    if (err.code === 11000) {
        // Handle duplicate key error
        errorMessage = 'Email already exists';
    } else if (err.name === 'ValidationError') {
        // Handle Mongoose validation error
        errorMessage = Object.values(err.errors).map(val => val.message).join(', ');
    } else {
        // Generic error message
        errorMessage = err.message;
    }

    // Send a failed response
    res.status(500).json({
        status: 'failed',
        message: errorMessage
    });

}
});

export default router;