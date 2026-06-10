const express = require("express");
const Invoice = require("../models/Invoice");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Create invoice
router.post("/", protect, async (req, res) => {
  try {
    const { customerName, amount, status, dueDate } = req.body;

    const invoice = await Invoice.create({
      customerName,
      amount,
      status,
      dueDate,
      user: req.user._id,
    });

    res.status(201).json(invoice);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get user's invoices
router.get("/", protect, async (req, res) => {
  try {
    const invoices = await Invoice.find({ user: req.user._id }).sort({
      createdAt: -1,
    });

    res.json(invoices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update invoice
router.put("/:id", protect, async (req, res) => {
  try {
    const { customerName, amount, status, dueDate } = req.body;

    const invoice = await Invoice.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }

    invoice.customerName = customerName || invoice.customerName;
    invoice.amount = amount || invoice.amount;
    invoice.status = status || invoice.status;
    invoice.dueDate = dueDate || invoice.dueDate;

    const updatedInvoice = await invoice.save();

    res.json(updatedInvoice);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete invoice
router.delete("/:id", protect, async (req, res) => {
  try {
    const invoice = await Invoice.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }

    await invoice.deleteOne();

    res.json({ message: "Invoice deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;