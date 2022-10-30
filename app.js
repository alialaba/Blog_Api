const express = require("express");
const app = express();
const BlogRouter = require("./routes/blogRoutes")


//connect to database
const database = require("./db");
database.connectToDB();


app.use(express.json());//bodyparser

require("dotenv").config();
const PORT = process.env.PORT

//routes 
app.use("/blogs", BlogRouter)


//route error
app.use("*", (req,res)=>{
    res.status(404).json({message:"Route is not found"})
})

app.listen(PORT,()=>{
    console.log(`Server is running on PORT ${PORT}`)
})