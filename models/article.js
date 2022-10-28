const mongoose = require("mongoose");

const Schema = mongoose.Schema


const articleSchema = new Schema({
title:{
    type: String,
    required: true,
    unique: true
},
description:{
    type: String,
},
author:{
    type: String,
    required: true,
},
status:{
    type: String,
    default : "draft". enum ["draft", "published"]
},
body:{
    type: String,
    required: true,
},
read_count:{
    type: Number,
    required: true,
},
reading_time:{
    type: Number,
},
reading_time:{
    type: Number,
},
tags:[String],
timestamps:true
})

module.exports = mongoose.model("article" , articleSchema)