const app = require("./app")

//connect to database
const database = require("./db");
database.connectToDB(); 

require("dotenv").config();
const PORT = process.env.PORT


app.listen(PORT,()=>{
    console.log(`Server is running on PORT ${PORT}`)
})