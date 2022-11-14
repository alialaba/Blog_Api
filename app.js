const express = require("express");

const app = express();

const BlogRouter = require("./routes/blogRoutes");
const authRouter = require("./routes/authRoutes");


app.use(express.json());//express bodyparser




// register passport
require("./passport") ;

//routes 
app.use("/",  authRouter)
app.use("/blogs", BlogRouter)


// home route
app.get('/', (req, res) => {
    return res.json({ status: true , message:"Hey, Welcome to the Blog APIs World "})
})

//route 404 error
app.use("*", (req,res)=>{
   return  res.status(404).json({message:"Route is not found"})
})

module.exports = app

