const mongoose = require("mongoose")
require("dotenv").config()

const MONGODB_URL = process.env.MONGODB_URL; //defined MONGODB_URL


//connectToMongoDB func

function connectToMongoDB (){
    mongoose.connect(MONGODB_URL);

    mongoose.connection.on("connected", ()=>{
        console.log("Connected to database successfully");
    })

    mongoose.connection.on("error", (err)=>{
        console.log("Not Connected to database " + err);
    })
}

module.exports = {connectToMongoDB}