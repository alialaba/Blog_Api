const express = require("express");
const app = express();
const BlogRouter = require("./routes/blogRoutes")




//connect to database
const database = require("./db");
const authRouter = require("./routes/authRoutes");
database.connectToDB();


app.use(express.json());//bodyparser




require("dotenv").config();
const PORT = process.env.PORT

// register passport
require("./passport") ;

//routes 
app.use("/",  authRouter)
app.use("/blogs", BlogRouter)


// home route
app.get('/', (req, res) => {
    return res.json({ status: true , message:"Hey, Welcome to the Blog APIs World "})
})

//route error
app.use("*", (req,res)=>{
    res.status(404).json({message:"Route is not found"})
})

app.listen(PORT,()=>{
    console.log(`Server is running on PORT ${PORT}`)
})