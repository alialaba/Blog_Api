const express = require("express");
const app = express();

const PORT = 4000
require("./db/db").connectToMongoDB() //connect to db



//general tesing route
app.get("/", (req,res)=>{
    res.send("Welcome to the blog Api")
})

//general error handle

app.use(function(err,req,res,next){
console.log(err)
res.status(err.status || 500);
res.json({error : err.message})
})

//server
app.listen(PORT,()=>{
console.log(`Server running on ${PORT}`)
})