const Member = require("../models/Member");


// Revenue Report
const getRevenueReport = async (req, res) => {

    try {

        const members = await Member.find();

        const monthlyRevenue = {};


        members.forEach((member) => {

            const date = new Date(member.startDate);

            const month = date.toLocaleString("default", {
                month: "long"
            });


            const amount =
                member.price ||
                member.amount ||
                member.planPrice ||
                member.fee ||
                0;



            if(monthlyRevenue[month]) {

                monthlyRevenue[month] += amount;

            } else {

                monthlyRevenue[month] = amount;

            }


        });



        const report = Object.keys(monthlyRevenue).map((month) => ({

            month,
            revenue: monthlyRevenue[month]

        }));


        res.json(report);



    } catch(error) {

        res.status(500).json({
            message: error.message
        });

    }

};




// Member Growth Report
const getMemberGrowthReport = async (req, res) => {

    try {

        const members = await Member.find();

        const monthlyMembers = {};


        members.forEach((member) => {

            const date = new Date(member.startDate);


            const month = date.toLocaleString("default", {
                month: "long"
            });



            if(monthlyMembers[month]) {

                monthlyMembers[month] += 1;

            } else {

                monthlyMembers[month] = 1;

            }


        });



        const report = Object.keys(monthlyMembers).map((month) => ({

            month,
            members: monthlyMembers[month]

        }));


        res.json(report);



    } catch(error) {

        res.status(500).json({
            message: error.message
        });

    }

};





// Membership Plan Distribution Report
const getPlanDistributionReport = async (req, res) => {

    try {

        const members = await Member.find();


        const planCount = {};



        members.forEach((member) => {


            const plan = member.membershipType;



            if(planCount[plan]) {

                planCount[plan] += 1;

            } else {

                planCount[plan] = 1;

            }


        });




        const report = Object.keys(planCount).map((plan) => ({

            plan,
            members: planCount[plan]

        }));



        res.json(report);



    } catch(error) {


        res.status(500).json({

            message: error.message

        });


    }

};





// Expiring Memberships Report
const getExpiringMemberships = async (req, res) => {

    try {

        const today = new Date();

        const upcoming = new Date();
        upcoming.setDate(today.getDate() + 7);


        const members = await Member.find({

            expiryDate: {
                $gte: today,
                $lte: upcoming
            }

        }).sort({

            expiryDate: 1

        });


        const report = members.map((member) => ({

            name: member.name,
            plan: member.membershipType,
            expiryDate: member.expiryDate

        }));


        res.json(report);



    } catch(error) {

        res.status(500).json({
            message: error.message
        });

    }

};




module.exports = {

    getRevenueReport,
    getMemberGrowthReport,
    getPlanDistributionReport,
    getExpiringMemberships

};