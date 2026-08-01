const express = require("express");

const {
    getPlans,
    createPlan,
    updatePlan,
    deletePlan
} = require("../controllers/planController");


const router = express.Router();



router.get("/", getPlans);


router.post("/", createPlan);


router.put("/:id", updatePlan);


router.delete("/:id", deletePlan);



module.exports = router;