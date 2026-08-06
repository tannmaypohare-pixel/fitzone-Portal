const mongoose = require("mongoose");


const paymentSchema = new mongoose.Schema(

  {

    memberId: {

      type: mongoose.Schema.Types.ObjectId,

      ref: "Member",

      required: true,

    },


    memberName: {

      type: String,

      required: true,

    },


    plan: {

      type: String,

      required: true,

    },


    amount: {

      type: Number,

      required: true,

    },


    status: {

      type: String,

      enum: [
        "Paid",
        "Pending"
      ],

      default: "Paid",

    },


    paymentDate: {

      type: Date,

      default: Date.now,

    },


    paymentMethod: {

      type: String,

      enum: [
        "Cash",
        "UPI",
        "Card"
      ],

      default: "UPI",

    },


  },

  {
    timestamps: true
  }

);





module.exports = mongoose.model(
  "Payment",
  paymentSchema
);