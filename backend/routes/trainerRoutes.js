const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");


const {
    getTrainers,
    getTrainerById,
    createTrainer,
    updateTrainer,
    deleteTrainer
} = require("../controllers/trainerController");



// Get trainers
router.get(
    "/",
    authMiddleware,
    getTrainers
);



// Create trainer
router.post(
    "/",
    authMiddleware,
    createTrainer
);



// Get single trainer
router.get(
    "/:id",
    authMiddleware,
    getTrainerById
);



// Update trainer
router.put(
    "/:id",
    authMiddleware,
    updateTrainer
);



// Delete trainer
router.delete(
    "/:id",
    authMiddleware,
    deleteTrainer
);



module.exports = router;