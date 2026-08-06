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

            "1 Month",

            "3 Month",

            "6 Month",

            "12 Month"

        ],

        default: "1 Month"

    },


    startDate: {

        type: Date,

        default: Date.now

    },


    expiryDate: {

        type: Date,

        required: true

    },
    trainerId: {

    type: mongoose.Schema.Types.ObjectId,

    ref: "User",

    default: null

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