require("dotenv").config;
const express= require("express");
const { connectDB } =require("./config/db.js");
const productRoutes =require("./routes/product.route.js");
const cors=require('cors')
const authRoutes = require("./routes/login.js");
const userRoutes = require("./routes/user.js")
const cookieParser = require("cookie-parser");


const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(cookieParser())
app.use(express.json()); // allows us to accept JSON data in the req.body
app.use("/api/products", productRoutes);
app.use("/api", authRoutes);
app.use("/api/user", userRoutes);
 // Enable CORS for all routes
const start=async()=>{
    try{
await connectDB()
app.listen(PORT, console.log(`server running at http://localhost:${PORT}/`))
    }catch(err){
        console.error(err.message);
        process.exit(1);
    }

}

start();