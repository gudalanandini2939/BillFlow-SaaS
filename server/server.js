const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const invoiceRoutes = require("./routes/invoiceRoutes");

dotenv.config();

connectDB();

const app = express();

// CORS
app.use(cors());

// Middleware
app.use(express.json());

// Test Route
app.get("/", (req, res) => {
  res.send("BillFlow API Running...");
});

app.get("/api/auth-test", (req, res) => {
  res.json({ message: "Auth routes loaded correctly" });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/invoices", invoiceRoutes);

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});