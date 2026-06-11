const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const invoiceRoutes = require("./routes/invoiceRoutes");

dotenv.config();
connectDB();

const app = express();

// CORS - explicitly allow your frontend
app.use(cors({
  origin: "https://bill-flow-saa-s.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());

app.get("/", (req, res) => res.send("BillFlow API Running..."));
app.get("/api/auth-test", (req, res) => res.json({ message: "Auth routes loaded correctly" }));

app.use("/api/auth", authRoutes);
app.use("/api/invoices", invoiceRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));