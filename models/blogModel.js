const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title:{
        type: String,
        required:true,
        unique:true
    },
    description:String,
    author:{type: mongoose.Schema.Types.ObjectId,
            ref: "User"},
    state:{
        type:String,
        default:"draft",
        enum:["draft", "published"]
    },
    read_count: {
        type:Number,
        default: 0
    },
    reading_time:Number,
    tags:[String],
    body:{
        type: String,
        required:true
    },
    created_at:{
        type:Date,
        default: Date.now()
    },
    updated_at:{
        type:Date,
        default: Date.now()
    }

})

const Blog = mongoose.model("blogs", blogSchema) // collection name and schema name

module.exports =Blog