const User = require("../models/User");
const Member = require("../models/Member");


// Get trainers
const getTrainers = async (req, res) => {

    try {


        // ADMIN → show all trainers
        if (req.user.role === "ADMIN") {


            const trainers = await User.find({

                role: "TRAINER"

            }).select("-password");


            return res.json(trainers);

        }





        // MEMBER → show only assigned trainer
        if (req.user.role === "MEMBER") {


            const user = await User.findById(
                req.user.id
            );



            if (!user) {

                return res.json([]);

            }



            const member = await Member.findOne({

                email: user.email

            });





            if (!member || !member.trainerId) {

                return res.json([]);

            }





            const trainer = await User.findOne({

                _id: member.trainerId,

                role: "TRAINER"

            }).select("-password");





            return res.json(

                trainer ? [trainer] : []

            );


        }





        return res.json([]);



    } catch (error) {


        res.status(500).json({

            message: error.message

        });


    }

};









// Get trainer by ID
const getTrainerById = async (req, res) => {


    try {


        const trainer = await User.findOne({

            _id: req.params.id,

            role: "TRAINER"

        }).select("-password");





        if (!trainer) {


            return res.status(404).json({

                message: "Trainer not found"

            });


        }




        res.json(trainer);




    } catch (error) {


        res.status(500).json({

            message: error.message

        });


    }

};









// Create Trainer
const createTrainer = async (req, res) => {


    try {


        const trainer = await User.create({

            ...req.body,

            role: "TRAINER"

        });




        res.status(201).json({

            message: "Trainer created successfully",

            trainer

        });





    } catch(error) {


        res.status(500).json({

            message:error.message

        });


    }

};









// Update Trainer
const updateTrainer = async (req, res) => {


    try {


        const trainer = await User.findOneAndUpdate(

            {

                _id: req.params.id,

                role:"TRAINER"

            },


            req.body,


            {

                new:true

            }


        ).select("-password");






        if(!trainer){


            return res.status(404).json({

                message:"Trainer not found"

            });


        }





        res.json({

            message:"Trainer updated successfully",

            trainer

        });





    } catch(error) {


        res.status(500).json({

            message:error.message

        });


    }

};









// Delete Trainer
const deleteTrainer = async (req,res)=>{


    try {


        const trainer = await User.findOneAndDelete({

            _id:req.params.id,

            role:"TRAINER"

        });





        if(!trainer){


            return res.status(404).json({

                message:"Trainer not found"

            });


        }





        res.json({

            message:"Trainer deleted successfully"

        });





    } catch(error) {


        res.status(500).json({

            message:error.message

        });


    }

};








module.exports = {


    getTrainers,

    getTrainerById,

    createTrainer,

    updateTrainer,

    deleteTrainer


};