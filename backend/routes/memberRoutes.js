const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");


console.log("✅ memberRoutes loaded");



const {

    getMembers,
    addMember,
    deleteMember,
    updateMember,
    getDashboardStats,
    assignTrainer,
    getMemberTrainer,
    getMemberProfile

} = require("../controllers/memberControllers");




// DASHBOARD STATS
router.get(
    "/stats",
    authMiddleware,
    getDashboardStats
);




// GET LOGGED IN MEMBER PROFILE
router.get(
    "/profile",
    authMiddleware,
    getMemberProfile
);




// GET ALL MEMBERS
router.get(
    "/",
    authMiddleware,
    getMembers
);




// ADD MEMBER
router.post(
    "/",
    authMiddleware,
    addMember
);




// UPDATE MEMBER
router.put(
    "/:id",
    authMiddleware,
    updateMember
);




// DELETE MEMBER
router.delete(
    "/:id",
    authMiddleware,
    deleteMember
);




// ASSIGN TRAINER
router.put(
    "/:id/trainer",
    authMiddleware,
    assignTrainer
);




// GET MEMBER TRAINER
router.get(
    "/:id/trainer",
    authMiddleware,
    getMemberTrainer
);



module.exports = router;