const Payment = require("../models/Payment");
const Member = require("../models/Member");


// Get all payments
exports.getPayments = async (req, res) => {

  try {

    const payments = await Payment.find()
      .populate("memberId")
      .sort({ paymentDate: -1 });


    res.status(200).json(payments);


  } catch(error) {

    res.status(500).json({
      message:error.message
    });

  }

};




// Create payment + Activate Membership + n8n Automation
exports.createPayment = async (req, res) => {

  try {

    console.log(
      "Payment Data Received:",
      req.body
    );


    // Create payment record
    const payment = await Payment.create(
      req.body
    );


    console.log(
      "Payment Saved:",
      payment
    );



    // Find member
    const member = await Member.findById(
      req.body.memberId
    );



    if(member){

      const today = new Date();

      let expiryDate = new Date(today);



      // Calculate expiry according to plan

      if(req.body.plan.includes("1 Month")){

        expiryDate.setMonth(
          expiryDate.getMonth() + 1
        );

      }

      else if(req.body.plan.includes("3 Month")){

        expiryDate.setMonth(
          expiryDate.getMonth() + 3
        );

      }

      else if(req.body.plan.includes("6 Month")){

        expiryDate.setMonth(
          expiryDate.getMonth() + 6
        );

      }

      else if(req.body.plan.includes("12 Month")){

        expiryDate.setMonth(
          expiryDate.getMonth() + 12
        );

      }



      member.membershipType =
        req.body.plan;


      member.startDate =
        today;


      member.expiryDate =
        expiryDate;


      member.status =
        "Active";



      await member.save();



      console.log(
        "Membership Updated:",
        member
      );


    }




    // ===============================
    // n8n PAYMENT AUTOMATION WEBHOOK
    // ===============================

    try {

      if(process.env.N8N_WEBHOOK_URL){

        await fetch(
          process.env.N8N_WEBHOOK_URL,
          {
            method:"POST",

            headers:{
              "Content-Type":"application/json"
            },

            body:JSON.stringify({

              memberId: req.body.memberId,

              plan: req.body.plan,

              amount: req.body.amount,

              paymentMethod:
              req.body.paymentMethod,

              paymentId:
              payment._id

            })

          }
        );


        console.log(
          "n8n webhook triggered"
        );

      }


    } catch(webhookError){

      console.log(
        "n8n webhook failed:",
        webhookError.message
      );

      // Payment should still succeed even if automation fails

    }




    res.status(201).json({

      message:
      "Payment successful and membership activated",

      payment

    });



  } catch(error) {


    console.log(
      "PAYMENT ERROR:",
      error
    );


    res.status(500).json({

      message:error.message

    });


  }


};





// Update payment
exports.updatePayment = async (req, res) => {

  try {

    const payment = await Payment.findByIdAndUpdate(

      req.params.id,

      req.body,

      {
        new:true,
        runValidators:true
      }

    ).populate("memberId");



    if(!payment){

      return res.status(404).json({

        message:"Payment not found"

      });

    }



    res.status(200).json(payment);



  } catch(error){

    res.status(500).json({

      message:error.message

    });

  }

};






// Delete payment
exports.deletePayment = async (req,res)=>{

  try{

    const payment =
      await Payment.findByIdAndDelete(
        req.params.id
      );



    if(!payment){

      return res.status(404).json({

        message:"Payment not found"

      });

    }



    res.status(200).json({

      message:
      "Payment deleted successfully"

    });



  }catch(error){

    res.status(500).json({

      message:error.message

    });

  }

};






// Get total revenue
exports.getRevenue = async(req,res)=>{

  try{

    const revenue =
      await Payment.aggregate([

        {

          $match:{

            status:"Paid"

          }

        },


        {

          $group:{

            _id:null,

            totalRevenue:{

              $sum:"$amount"

            }

          }

        }


      ]);



    res.status(200).json({

      revenue:
      revenue[0]?.totalRevenue || 0

    });



  }catch(error){

    res.status(500).json({

      message:error.message

    });

  }

};