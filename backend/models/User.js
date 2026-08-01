const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },


    email: {
        type: String,
        required: true,
        unique: true
    },


    password: {
        type: String,
        required: false
    },


    phone: {
        type: String
    },


    // Login provider
    provider: {
        type: String,
        enum: ["local", "google", "apple"],
        default: "local"
    },


    googleId: {
        type: String
    },


    appleId: {
        type: String
    },


    role: {
        type: String,
        enum: ["ADMIN", "TRAINER", "MEMBER"],
        default: "MEMBER"
    },


    // Forgot Password fields
    resetPasswordToken: {
        type: String
    },


    resetPasswordExpires: {
        type: Date
    }


}, {
    timestamps: true
});


module.exports = mongoose.model("User", userSchema);