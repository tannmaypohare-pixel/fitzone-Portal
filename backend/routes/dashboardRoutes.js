const express = require("express");

const router = express.Router();


const {
    getDashboardStats,
    getExpiringMembers
} = require("../controllers/dashboardController");



// Dashboard stats
router.get("/stats", getDashboardStats);


// Expiring memberships
router.get("/expiring", getExpiringMembers);



module.exports = router;