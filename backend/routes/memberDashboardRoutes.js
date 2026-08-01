const express = require("express");

const router = express.Router();

const {
    getMemberDashboard
} = require("../controllers/memberDashboardController");


const authMiddleware = require("../middleware/authMiddleware");


router.get(
    "/dashboard",
    authMiddleware,
    getMemberDashboard
);


module.exports = router;