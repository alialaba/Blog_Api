const mongoose = require("mongoose");

require("dotenv").config();

const MONGODB_URL_CONNECTION = process.env.MONGODB_URL_CONNECTION;


function connectToDB(){
    mongoose.connect(MONGODB_URL_CONNECTION);


    mongoose.connection.on('connected', () => {
        console.log('Connected to MongoDB successfully');
    });

    mongoose.connection.on('error', (err) => {
        console.log('Error connecting to MongoDB');
        console.log(err);
    })
}

module.exports={ connectToDB }