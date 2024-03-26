const express=require('express');
const connectToDb=require("./config/connectToDb");
const xss=require("xss-clean");
const rateLimiting=require("express-rate-limit");
const helmet=require("helmet");
const hpp=require("hpp");
const { errorHandler, notFound } = require('./midelweres/error');
const cors=require("cors")
require("dotenv").config()
//connect Db
connectToDb();


//init  App
const app=express();


//MiddleWere
app.use(express.json());

//Security Headers(helmet)
app.use(helmet())

//prevent Http param Pollution
app.use(hpp());

//prevent Xss(Cross Site Scripting) Attacks
app.use(xss());

//Rate Limiting
app.use(rateLimiting({
    windowMs:10 * 60 * 1000, //10
    max:200,
}));

//Cors Policy
app.use(cors({
    origin:"http://localhost:3000"
}))

//router
app.use("/api/auth",require("./routes/authRoute"));
app.use("/api/users",require("./routes/userRoute"));
app.use("/api/posts",require("./routes/postRoute"));
app.use("/api/comments",require("./routes/commentRoute"));
app.use("/api/categories",require("./routes/categoryRoute"));
app.use("/api/password",require("./routes/passwordRoute"))

//error Handler midelwere
app.use(notFound)
app.use(errorHandler)
//Running The Server
const PORT=process.env.PORT || 8000;
app.listen(PORT,()=> console.log(`Server is Running in ${process.env.NODE_ENV} mod om port ${PORT}`))