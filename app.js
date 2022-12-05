const express = require("express");

const app = express();

const BlogRouter = require("./routes/blogRoutes");
const authRouter = require("./routes/authRoutes");

const rateLimit = require('express-rate-limit')



const limiter = rateLimit({
    windowMs: 0.5 * 60 * 1000, // per 5 seconds
    max:4 , //Limit each IP to 4 requests per `window` (here, per 5 seconds)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

// Apply the rate limiting middleware to all requests
app.use(limiter)

app.use(express.json());//express bodyparser




// register passport
require("./config/passport") ;

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

