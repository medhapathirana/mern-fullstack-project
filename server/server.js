// import * as dotenv from "dotenv";
// dotenv.config();

// import express from "express";
// import cors from "cors";
// import bodyParser from "body-parser";
// import connectDB from "./Database/Connect.js";
// import itemRoutes from "./routes/itemRoutes.js";
// // import userRoutes from "./routes/userRoutes.js";
// import orderRoutes from "./routes/orderRoutes.js";
// import register from "./routes/register.routes.js";
// import loginRoutes from "./routes/login.routes.js";
// const loginRoutes = require('./routes/login.routes');


// const app = express();
// app.use(express.json());
// app.use(cors());
// app.use(bodyParser.json());

// connectDB(process.env.MONGODB_URL)
//   .then(() => {
//     console.log('MongoDB connected successfully');
//   })
//   .catch((err) => {
//     console.error('MongoDB connection failed', err);
//   });

// const PORT = 5000;

// // Corrected route
// // app.use("/api/register", userRoutes);
// app.use('/api/register',register);
// app.use('/api/login', loginRoutes);
// app.use("/api/items", itemRoutes);
// app.use("/api/orders",orderRoutes);


// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });

//------------------------------------------------------------------------
import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import connectDB from "./Database/Connect.js";
import itemRoutes from "./routes/itemRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import register from "./routes/register.routes.js";
import loginRoutes from "./routes/login.routes.js";
import CartRoutes from "./routes/cart.routes.js";
import profileRoutes from "./routes/profile.routes.js";

const app = express();

// Middleware setup
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB using the connection URL from environment variables
connectDB(process.env.MONGO_URI)
.then(() => {
  console.log("✅ MongoDB connected");
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
})
.catch((err) => console.error("MongoDB connection error:", err));


// Define the port to run the server on
const PORT = process.env.PORT || 5000;

// Routes setup
app.use("/api/register", register);
app.use("/api/login", loginRoutes);
app.use("/api/items", itemRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/cart", CartRoutes);
app.use("/api/profile", profileRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

