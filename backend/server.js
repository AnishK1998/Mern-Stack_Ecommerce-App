const app = require('./app')
const cloudinary = require("cloudinary")
const connectDatabase = require('./config/database');

//handling uncaught exception
process.on("uncaughtException",(err)=>{
console.log("Error :", err.message);
console.log("shutting down the server due to uncaught exception");
process.exit(1);
})


// const dotenv = require('dotenv');

// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({ path: "backend/config/config.env" });
  }

//Connecting to database
connectDatabase();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  
const server = app.listen(process.env.PORT , ()=>{
    console.log(`Server is running on port no ${process.env.PORT}`)
})

//unhandled promise rejection (mainly database connection error)
process.on("unhandledRejection", (err)=>{
console.log("Error :",err.message);
console.log("shutting down the server due to unhandled promise rejection");
server.close(()=>{
    process.exit(1);  //after closing server ,exit the process
})

})




// Cloud Name: dif8c78xj
//API key : 956736432575597
// API SECRET : KfWuV3SnV4aMte20lbgP05wNV1o

