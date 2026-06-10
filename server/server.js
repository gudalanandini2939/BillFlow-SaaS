const invoiceRoutes = require("./routes/invoiceRoutes");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("BillFlow API Running...");
});

const PORT = process.env.PORT || 5000;

app.use("/api/invoices", invoiceRoutes);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


app.use("/api/auth", authRoutes);