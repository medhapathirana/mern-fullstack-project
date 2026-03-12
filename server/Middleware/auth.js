import jwt from "jsonwebtoken";
import User from "../Database/Models/User.js"; // Assuming a User model

export const authenticate = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Expecting Bearer token
  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);  // Make sure your JWT_SECRET is correct
    req.user = await User.findById(decoded.id);  // Assuming you store user ID in the JWT payload
    if (!req.user) {
      return res.status(404).json({ message: "User not found" });
    }
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
