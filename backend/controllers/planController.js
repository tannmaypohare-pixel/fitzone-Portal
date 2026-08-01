const Plan = require("../models/Plan");



// GET ALL PLANS

exports.getPlans = async (req, res) => {

    try {


        const plans = await Plan.find()
            .sort({
                createdAt: -1
            });



        res.status(200).json(plans);



    } catch(error) {


        res.status(500).json({

            message: error.message

        });


    }

};








// CREATE PLAN

exports.createPlan = async (req, res) => {

    try {


        const {
            name,
            duration,
            price,
            description,
            status

        } = req.body;





        const existingPlan = await Plan.findOne({

            name

        });





        if(existingPlan){


            return res.status(400).json({

                message:"Plan already exists"

            });


        }







        const plan = await Plan.create({

            name,

            duration,

            price,

            description,

            status: status || "Active"

        });







        res.status(201).json(plan);






    } catch(error) {



        res.status(500).json({

            message:error.message

        });



    }

};









// UPDATE PLAN

exports.updatePlan = async(req,res)=>{


    try{


        const plan = await Plan.findByIdAndUpdate(

            req.params.id,

            req.body,

            {

                new:true,

                runValidators:true

            }

        );





        if(!plan){


            return res.status(404).json({

                message:"Plan not found"

            });


        }





        res.status(200).json(plan);





    }catch(error){


        res.status(500).json({

            message:error.message

        });



    }


};









// DELETE PLAN

exports.deletePlan = async(req,res)=>{


    try{


        const plan = await Plan.findByIdAndDelete(

            req.params.id

        );





        if(!plan){


            return res.status(404).json({

                message:"Plan not found"

            });


        }





        res.status(200).json({

            message:"Plan deleted successfully"

        });





    }catch(error){


        res.status(500).json({

            message:error.message

        });



    }


};