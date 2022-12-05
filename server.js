const app = require("./app")

//connect to database
const database = require("./config/db");
database.connectToDB(); 

require("dotenv").config();
const PORT = process.env.PORT || 3343

app.listen(PORT,()=>{
    console.log(`Server is running on PORT ${PORT}`)
})

