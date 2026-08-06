const Member = require("../models/Member");
const Payment = require("../models/Payment");


// GET DASHBOARD STATS (LIVE DATA)
exports.getDashboardStats = async (req, res) => {

    try {

        const today = new Date();


        // Total Members
        const totalMembers = await Member.countDocuments();



        // Active Memberships
        // Based only on expiry date
        const activeMembers = await Member.countDocuments({
            expiryDate: {
                $gte: today
            }
        });



        // Expired Memberships
        // Based only on expiry date
        const expiredPlans = await Member.countDocuments({
            expiryDate: {
                $lt: today
            }
        });



        // Revenue Calculation from Payments Collection
        const revenueData = await Payment.aggregate([
            {
                $group: {
                    _id: null,
                    totalRevenue: {
                        $sum: "$amount"
                    }
                }
            }
        ]);


        const revenue = revenueData.length
            ? revenueData[0].totalRevenue
            : 0;



        res.json({

            totalMembers,
            activeMembers,
            expiredPlans,
            revenue

        });



    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};





// GET EXPIRING MEMBERS (NEXT 7 DAYS)
exports.getExpiringMembers = async (req, res) => {

    try {

        const today = new Date();


        const nextWeek = new Date();
        nextWeek.setDate(today.getDate() + 7);



        const members = await Member.find({

            expiryDate: {
                $gte: today,
                $lte: nextWeek
            }

        })
        .select(
            "name phone email membershipType expiryDate"
        );



        res.json(members);



    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};