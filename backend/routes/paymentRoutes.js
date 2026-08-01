const express = require("express");

const router = express.Router();

const {
  getPayments,
  createPayment,
  updatePayment,
  deletePayment,
  getRevenue,
} = require("../controllers/paymentController");

// Get all payments
router.get("/", getPayments);

// Get total revenue
router.get("/revenue", getRevenue);

// Create payment
router.post("/", createPayment);

// Update payment
router.put("/:id", updatePayment);

// Delete payment
router.delete("/:id", deletePayment);

module.exports = router;