const express = require("express");

const router = express.Router();


const {
    getRevenueReport,
    getMemberGrowthReport,
    getPlanDistributionReport,
    getExpiringMemberships
} = require("../controllers/reportController");



// Revenue Report
router.get(
    "/revenue",
    getRevenueReport
);



// Member Growth Report
router.get(
    "/member-growth",
    getMemberGrowthReport
);



// Membership Plan Distribution
router.get(
    "/plans",
    getPlanDistributionReport
);



// Expiring Memberships
router.get(
    "/expiring",
    getExpiringMemberships
);



module.exports = router;