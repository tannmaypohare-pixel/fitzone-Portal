const mongoose = require("mongoose");


const planSchema = new mongoose.Schema(

    {

        name: {

            type: String,

        },


        duration: {

            type: String,

            required: true

        },


        price: {

            type: Number,

            required: true

        },


        description: {

            type: String,

            default: ""

        },


        status: {

            type: String,

            default: "Active"

        }


    },

    {
        timestamps:true
    }

);



module.exports = mongoose.model(
    "Plan",
    planSchema
);