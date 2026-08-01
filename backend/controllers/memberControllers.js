const Member = require("../models/Member");
const User = require("../models/User");
const bcrypt = require("bcryptjs");


// GET ALL MEMBERS
exports.getMembers = async (req, res) => {

    try {

        const members = await Member.find();

        res.json(members);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};



// ADD MEMBER
exports.addMember = async (req, res) => {

    try {

        const {
            name,
            phone,
            email,
            age,
            membershipType,
            startDate,
            expiryDate
        } = req.body;



        // CHECK DUPLICATE PHONE
        const existingMember = await Member.findOne({
            phone
        });


        if (existingMember) {

            return res.status(400).json({
                message: "Member already exists with this phone number"
            });

        }



        // CHECK DUPLICATE EMAIL
        const existingUser = await User.findOne({
            email
        });


        if (existingUser) {

            return res.status(400).json({
                message: "User already exists with this email"
            });

        }



        // DEFAULT PASSWORD
        const defaultPassword = "FitZone@123";


        const hashedPassword = await bcrypt.hash(
            defaultPassword,
            10
        );



        // CREATE USER LOGIN
        const user = await User.create({

            name,

            email,

            password: hashedPassword,

            role: "MEMBER"

        });



        // CREATE MEMBER PROFILE
        const member = await Member.create({

            userId: user._id,

            name,

            phone,

            email,

            age,

            membershipType,

            startDate,

            expiryDate

        });



        res.status(201).json({

            message: "Member created successfully",

            loginEmail: email,

            defaultPassword,

            member

        });



    } catch (error) {


        if (error.code === 11000) {

            return res.status(400).json({

                message: "Member already exists"

            });

        }


        res.status(500).json({

            message: error.message

        });


    }

};



// DELETE MEMBER
exports.deleteMember = async (req, res) => {

    try {

        const member = await Member.findByIdAndDelete(
            req.params.id
        );


        if (!member) {

            return res.status(404).json({

                message: "Member not found"

            });

        }


        res.json({

            message: "Member deleted successfully"

        });


    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};



// UPDATE MEMBER
exports.updateMember = async (req, res) => {

    try {


        const updatedMember =
            await Member.findByIdAndUpdate(

                req.params.id,

                req.body,

                { new: true }

            );


        res.json(updatedMember);



    } catch (error) {


        res.status(500).json({

            message: error.message

        });


    }

};



// GET DASHBOARD STATS (LIVE DATA)
exports.getDashboardStats = async (req, res) => {

    try {


        const totalMembers =
            await Member.countDocuments();



        const activeMembers =
            await Member.countDocuments({

                status: {
                    $regex: /^active$/i
                }

            });



        const expiredPlans =
            await Member.countDocuments({

                status: {
                    $regex: /^expired$/i
                }

            });



        const revenueData =
            await Member.aggregate([

                {
                    $group: {
                        _id: null,
                        total: {
                            $sum: "$price"
                        }
                    }
                }

            ]);



        const revenue =
            revenueData[0]?.total || 0;



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