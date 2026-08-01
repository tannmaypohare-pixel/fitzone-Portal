const Member = require("../models/Member");


// GET DASHBOARD STATS (LIVE DATA)
exports.getDashboardStats = async (req, res) => {

    try {

        const today = new Date();


        // Total Members
        const totalMembers = await Member.countDocuments();



        // Active Memberships
        const activeMembers = await Member.countDocuments({
            $or: [
                { expiryDate: { $gte: today } },
                { status: { $regex: /^active$/i } }
            ]
        });



        // Expired Memberships
        const expiredPlans = await Member.countDocuments({
            $or: [
                { expiryDate: { $lt: today } },
                { status: { $regex: /^expired$/i } }
            ]
        });



        // Revenue Calculation
        const revenueData = await Member.aggregate([
            {
                $group: {
                    _id: null,
                    totalRevenue: {
                        $sum: {
                            $ifNull: [
                                "$price",
                                {
                                    $ifNull: [
                                        "$amount",
                                        {
                                            $ifNull: [
                                                "$planPrice",
                                                "$fee"
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
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