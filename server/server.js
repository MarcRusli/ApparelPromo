import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

// Import routes
import paymentRoutes from "./routes/payments.js";
import orderRoutes from "./routes/orders.js";
import uploadRoutes from "./routes/uploads.js";

dotenv.config();

// DEBUG: Check if STRIPE_SECRET_KEY loaded
console.log("STRIPE_SECRET_KEY loaded:", process.env.STRIPE_SECRET_KEY ? "✓ YES" : "✗ NO");
console.log("MONGODB_URI loaded:", process.env.MONGODB_URI ? "✓ YES" : "✗ NO");

const app = express();
const PORT = process.env.PORT || 8080;

// CORS configuration
const corsOptions = {
  origin: [
    "http://localhost:5173",
    "http://localhost:3000",
    process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null,
    "https://apparelpromo.vercel.app" // Update with your actual Vercel domain
  ].filter(Boolean)
};

app.use(cors(corsOptions));

// Middleware
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Database connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("✓ MongoDB connected"))
  .catch(err => console.error("✗ MongoDB connection error:", err));

// Routes
app.use("/api/payments", paymentRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/uploads", uploadRoutes);

// Health check
app.get("/", (req, res) => {
  res.json({ message: "Apparel Promo Server is running" });
});

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Error handler
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`✓ Server running on port ${PORT}`);
});