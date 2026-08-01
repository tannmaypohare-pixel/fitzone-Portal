const Payment = require("../models/Payment");

// Get all payments
exports.getPayments = async (req, res) => {
  try {
    const payments = await Payment.find()
      .populate("memberId")
      .sort({ paymentDate: -1 });

    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Create payment
 exports.createPayment = async (req, res) => {

  try {

    console.log("Payment Data Received:", req.body);

    const payment = await Payment.create(req.body);

    console.log("Payment Saved:", payment);

    res.status(201).json(payment);


  } catch (error) {

    console.log("PAYMENT ERROR:", error);

    res.status(500).json({
      message: error.message,
    });

  }

};

// Update payment
exports.updatePayment = async (req, res) => {
  try {
    const payment = await Payment.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    ).populate("memberId");

    if (!payment) {
      return res.status(404).json({
        message: "Payment not found",
      });
    }

    res.status(200).json(payment);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete payment
exports.deletePayment = async (req, res) => {
  try {
    const payment = await Payment.findByIdAndDelete(req.params.id);

    if (!payment) {
      return res.status(404).json({
        message: "Payment not found",
      });
    }

    res.status(200).json({
      message: "Payment deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get total revenue
exports.getRevenue = async (req, res) => {
  try {
    const revenue = await Payment.aggregate([
      {
        $match: {
          status: "Paid",
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: {
            $sum: "$amount",
          },
        },
      },
    ]);

    res.status(200).json({
      revenue: revenue[0]?.totalRevenue || 0,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};