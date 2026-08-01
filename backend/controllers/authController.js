const User = require("../models/User");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const { OAuth2Client } = require("google-auth-library");

const transporter = require("../config/mail");



// CREATE JWT TOKEN

const createToken = (user) => {

    return jwt.sign(
        {
            id: user._id,
            role: user.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn:"7d"
        }
    );

};



// REGISTER USER

exports.registerUser = async (req,res)=>{

    try{


        const {
            name,
            email,
            phone,
            password
        } = req.body;



        const existingUser = await User.findOne({
            email
        });



        if(existingUser){

            return res.status(400).json({
                message:"Email already registered"
            });

        }



        const hashedPassword = await bcrypt.hash(
            password,
            10
        );



        const user = await User.create({

            name,

            email,

            phone,

            password:hashedPassword,

            provider:"local",

            role:"MEMBER"

        });



        const token = createToken(user);



        user.password = undefined;



        res.status(201).json({

            message:"Account created successfully",

            token,

            user

        });



    }catch(error){

        console.log(error);

        res.status(500).json({
            message:"Registration failed"
        });

    }

};







// LOGIN USER

exports.loginUser = async(req,res)=>{


    try{


        const {
            email,
            password
        } = req.body;



        const user = await User.findOne({
            email
        });



        if(!user){

            return res.status(404).json({
                message:"User not found"
            });

        }



        // GOOGLE ACCOUNT CHECK

        if(user.provider === "google"){

            return res.status(400).json({
                message:"Please login using Google"
            });

        }



        const isMatch = await bcrypt.compare(
            password,
            user.password
        );



        if(!isMatch){

            return res.status(401).json({
                message:"Invalid password"
            });

        }



        const token = createToken(user);



        user.password = undefined;



        res.json({

            token,

            user

        });



    }catch(error){


        console.log(error);


        res.status(500).json({
            message:"Login failed"
        });


    }


};







// GOOGLE LOGIN

exports.googleLogin = async(req,res)=>{


    try{


        const {token} = req.body;



        if(!token){

            return res.status(400).json({
                message:"Google token missing"
            });

        }



        const client = new OAuth2Client(
            process.env.GOOGLE_CLIENT_ID
        );



        const ticket = await client.verifyIdToken({

            id_token:token,

            audience:process.env.GOOGLE_CLIENT_ID

        });



        const payload = ticket.getPayload();



        const {
            email,
            name,
            picture,
            sub
        } = payload;



        let user = await User.findOne({
            email
        });



        if(!user){


            user = await User.create({

                name,

                email,

                profileImage:picture,

                googleId:sub,

                provider:"google",

                role:"MEMBER"

            });


        }



        const jwtToken = createToken(user);



        user.password = undefined;



        res.json({

            token:jwtToken,

            user

        });



    }catch(error){


        console.log(error);


        res.status(500).json({

            message:"Google login failed"

        });


    }


};







// FORGOT PASSWORD

exports.forgotPassword = async(req,res)=>{


    try{


        const {email}=req.body;



        const user = await User.findOne({
            email
        });



        if(!user){

            return res.status(404).json({
                message:"User not found"
            });

        }



        const resetToken = crypto
            .randomBytes(32)
            .toString("hex");



        user.resetPasswordToken = resetToken;



        user.resetPasswordExpires =
            Date.now() + 15 * 60 * 1000;



        await user.save();



        const resetURL =
        `http://localhost:5173/reset-password/${resetToken}`;



        await transporter.sendMail({

            to:user.email,

            subject:"FitZone Password Reset",

            html:`

                <h2>FitZone Password Reset</h2>

                <p>Click below to reset your password:</p>

                <a href="${resetURL}">
                    Reset Password
                </a>

                <p>This link expires in 15 minutes.</p>

            `

        });



        res.json({

            message:"Password reset link sent to email"

        });



    }catch(error){


        console.log(error);


        res.status(500).json({
            message:"Error sending reset email"
        });


    }


};







// RESET PASSWORD

exports.resetPassword = async(req,res)=>{


    try{


        const user = await User.findOne({

            resetPasswordToken:req.params.token,

            resetPasswordExpires:{
                $gt:Date.now()
            }

        });



        if(!user){

            return res.status(400).json({

                message:"Invalid or expired token"

            });

        }



        user.password = await bcrypt.hash(

            req.body.password,

            10

        );



        user.provider = "local";

        user.resetPasswordToken = undefined;

        user.resetPasswordExpires = undefined;



        await user.save();



        res.json({

            message:"Password reset successful"

        });



    }catch(error){


        console.log(error);


        res.status(500).json({

            message:"Reset failed"

        });


    }


};