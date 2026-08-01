const Member = require("../models/Member");
const Payment = require("../models/Payment");



const getMemberDashboard = async (req, res) => {

    try {


        // Find member connected with logged-in user
        const member = await Member.findOne({
            userId: req.user.id
        });



        if (!member) {

            return res.status(404).json({

                message: "Member profile not found"

            });

        }



        // Get payment history
        const payments = await Payment.find({

            memberId: member._id

        }).sort({

            paymentDate: -1

        });



        const today = new Date();

        const startDate = new Date(
            member.startDate
        );

        const expiryDate = new Date(
            member.expiryDate
        );



        // Total membership duration
        const totalDays = Math.ceil(

            (expiryDate - startDate)
            /
            (1000 * 60 * 60 * 24)

        );



        // Remaining days
        const daysRemaining = Math.max(

            Math.ceil(

                (expiryDate - today)
                /
                (1000 * 60 * 60 * 24)

            ),

            0

        );



        // Completed days
        const completedDays =
            totalDays - daysRemaining;



        // Progress percentage
        const progress = totalDays > 0

            ? Math.min(

                Math.round(
                    (completedDays / totalDays) * 100
                ),

                100

            )

            : 0;



        res.json({

            name: member.name,

            email: member.email,

            plan: member.membershipType,

            expiryDate: member.expiryDate,

            daysRemaining,

            progress,

            attendance: 0,

            payments


        });



    } catch (error) {


        console.log(error);


        res.status(500).json({

            message: "Server error"

        });


    }

};



module.exports = {

    getMemberDashboard

};