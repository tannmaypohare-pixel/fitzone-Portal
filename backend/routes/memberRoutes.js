const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
    getMembers,
    addMember,
    deleteMember,
    updateMember,
    getDashboardStats
} = require("../controllers/memberControllers");


// GET DASHBOARD STATS
router.get(
    "/stats",
    authMiddleware,
    getDashboardStats
);


// MEMBER CRUD ROUTES
router.get(
    "/",
    authMiddleware,
    getMembers
);


router.post(
    "/",
    authMiddleware,
    addMember
);


router.put(
    "/:id",
    authMiddleware,
    updateMember
);


router.delete(
    "/:id",
    authMiddleware,
    deleteMember
);


module.exports = router;