require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");


// Routes
const memberRoutes = require("./routes/memberRoutes");
const authRoutes = require("./routes/authRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const planRoutes = require("./routes/planRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const memberDashboardRoutes = require("./routes/memberDashboardRoutes");
const reportRoutes = require("./routes/reportRoutes");
const trainerRoutes = require("./routes/trainerRoutes");


connectDB();



const app = express();



app.use(cors());

app.use(express.json());





// Member API Route
app.use("/api/members", memberRoutes);



// Authentication API Route
app.use("/api/auth", authRoutes);



// Admin Dashboard API Route
app.use("/api/dashboard", dashboardRoutes);



// Reports API Route
app.use("/api/reports", reportRoutes);



// Membership Plans API Route
app.use("/api/plans", planRoutes);



// Payments API Route
app.use("/api/payments", paymentRoutes);



// Member Dashboard API Route
app.use("/api/member", memberDashboardRoutes);

app.use("/api/trainers", trainerRoutes);






app.get("/", (req, res) => {

    res.json({

        message: "FitZone API is running 🚀"

    });

});





const PORT = process.env.PORT || 5001;



app.listen(PORT, () => {

    console.log(`Server running on port ${PORT}`);

});