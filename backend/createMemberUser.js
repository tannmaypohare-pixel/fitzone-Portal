const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const User = require("./models/User");

async function createUser() {

    try {

        await mongoose.connect(process.env.MONGO_URI);

        const existingUser = await User.findOne({
            email: "tannmaypohare@gmail.com"
        });

        if (existingUser) {
            console.log("User already exists");
            process.exit();
        }


        const hashedPassword = await bcrypt.hash("123456", 10);


        const user = await User.create({

            name: "Tanmay Pohare",

            email: "tannmaypohare@gmail.com",

            password: hashedPassword,

            role: "MEMBER"

        });


        console.log("User created successfully");
        console.log("USER ID:", user._id);


        process.exit();


    } catch (error) {

        console.log(error);

        process.exit(1);

    }

}


createUser();