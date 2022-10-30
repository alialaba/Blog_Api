const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({

    email:{
        type: String,
        required: true
    },
    first_name:{
        type: String,
        required: true
    },
    last_name:{
        type: String,
        required: true
    },
    password: Number

})

const User = mongoose.model("users", userSchema)// collection name and schema name

module.exports= User;