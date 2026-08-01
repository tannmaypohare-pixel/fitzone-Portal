const mongoose = require("mongoose");


const memberSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },


    name: {
        type: String,
        required: true
    },


    phone: {
        type: String,
        required: true,
        unique: true
    },


    email: {
        type: String
    },


    age: {
        type: Number
    },


    membershipType: {
        type: String,
        enum: [
            "Monthly",
            "Quarterly",
            "Yearly"
        ],
        default: "Monthly"
    },


    startDate: {
        type: Date,
        default: Date.now
    },


    expiryDate: {
        type: Date,
        required: true
    },


    status: {
        type: String,
        default: "Active"
    }


});


module.exports = mongoose.model(
    "Member",
    memberSchema
);