const express = require("express");

const router = express.Router();


const {
    registerUser,
    loginUser,
    googleLogin,
    forgotPassword,
    resetPassword
} = require("../controllers/authController");



// Register User
router.post(
    "/register",
    registerUser
);



// Login User
router.post(
    "/login",
    loginUser
);



// Google Login
router.post(
    "/google-login",
    googleLogin
);



// Forgot Password
router.post(
    "/forgot-password",
    forgotPassword
);



// Reset Password
router.put(
    "/reset-password/:token",
    resetPassword
);



module.exports = router;