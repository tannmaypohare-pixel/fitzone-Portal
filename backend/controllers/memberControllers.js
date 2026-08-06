const Member = require("../models/Member");
const User = require("../models/User");
const Plan = require("../models/Plan");
const Payment = require("../models/Payment");
const bcrypt = require("bcryptjs");


// GET ALL MEMBERS
exports.getMembers = async (req, res) => {

    try {

        const members = await Member.find()
            .populate(
                "trainerId",
                "name email phone specialization experience"
            );

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



        const existingMember = await Member.findOne({
            phone
        });


        if (existingMember) {

            return res.status(400).json({
                message: "Member already exists with this phone number"
            });

        }



        const existingUser = await User.findOne({
            email
        });


        if (existingUser) {

            return res.status(400).json({
                message: "User already exists with this email"
            });

        }



        const defaultPassword = "FitZone@123";


        const hashedPassword = await bcrypt.hash(
            defaultPassword,
            10
        );



        const user = await User.create({

            name,

            email,

            password: hashedPassword,

            role: "MEMBER"

        });





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



        // CREATE PAYMENT AUTOMATICALLY

        const plan = await Plan.findOne({

            duration: membershipType

        });



        if (plan) {

            await Payment.create({

                memberId: member._id,

                memberName: member.name,

                plan: plan.duration,

                amount: plan.price,

                status: "Paid",

                paymentMethod: "UPI"

            });

        }





        res.status(201).json({

            message: "Member created successfully",

            loginEmail: email,

            defaultPassword,

            member

        });



    } catch (error) {

        console.log(error);

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

                {
                    new:true
                }

            );


        res.json(updatedMember);



    } catch(error) {


        res.status(500).json({

            message:error.message

        });


    }

};








// ASSIGN TRAINER TO MEMBER (ADMIN)
exports.assignTrainer = async (req,res)=>{

    try {


        const {
            trainerId
        } = req.body;



        const trainer = await User.findOne({

            _id: trainerId,

            role:"TRAINER"

        });



        if(!trainer){

            return res.status(404).json({

                message:"Trainer not found"

            });

        }




        const member =
            await Member.findByIdAndUpdate(

                req.params.id,

                {
                    trainerId
                },

                {
                    new:true
                }

            )
            .populate(
                "trainerId",
                "name specialization experience"
            );




        res.json({

            message:"Trainer assigned successfully",

            member

        });



    } catch(error){


        res.status(500).json({

            message:error.message

        });


    }

};









// GET MEMBER TRAINER
exports.getMemberTrainer = async(req,res)=>{

    try {


        const member =
            await Member.findById(
                req.params.id
            )
            .populate(

                "trainerId",

                "name email phone specialization experience"

            );




        if(!member){

            return res.status(404).json({

                message:"Member not found"

            });

        }





        if(!member.trainerId){

            return res.json({

                message:"No trainer assigned",

                trainer:null

            });

        }





        res.json({

            trainer:member.trainerId

        });



    }catch(error){


        res.status(500).json({

            message:error.message

        });


    }

};









// GET DASHBOARD STATS
exports.getDashboardStats = async (req,res)=>{

    try {


        const totalMembers =
            await Member.countDocuments();



        const activeMembers =
            await Member.countDocuments({

                status:{
                    $regex:/^active$/i
                }

            });



        const expiredPlans =
            await Member.countDocuments({

                status:{
                    $regex:/^expired$/i
                }

            });



        res.json({

            totalMembers,

            activeMembers,

            expiredPlans,

            revenue:0

        });



    }catch(error){

        res.status(500).json({

            message:error.message

        });

    }

};
// GET LOGGED IN MEMBER PROFILE
exports.getMemberProfile = async (req, res) => {
    try {
        let member = await Member.findOne({
            userId: req.user.id
        });

        if (!member) {
            const user = await User.findById(req.user.id);

            if (user) {
                member = await Member.findOne({
                    email: user.email
                });
            }
        }

        if (!member) {
            return res.status(404).json({
                message: "Member profile not found"
            });
        }

        // rest of the code...


        // FIND LATEST PAYMENT
        const payment = await Payment.findOne({

            memberId: member._id

        }).sort({

            createdAt: -1

        });



        res.status(200).json({

            member,

            payment

        });



    } catch (error) {


        console.log(
            "PROFILE ERROR:",
            error.message
        );


        res.status(500).json({

            message: error.message

        });

    }

};







