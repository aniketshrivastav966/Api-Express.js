const express = require("express");
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const app = express();
require("dotenv").config()
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
const cookieParser = require("cookie-parser");
const sessions = require("express-session");
app.use(sessions({
    secret:"dsfgsgsdsgdsdsgdfg",
    saveUninitialized:true,
    cookie:{maxAge:6000},
    resave:false
}))
app.use(cookieParser())
const mongoDb =process.env.mongoDb;
// mongoose.Promise = global.Promise;
mongoose.connect(mongoDb, {useNewUrlParser:true}).then(()=>{
    console.log("database connected")
}).catch((err)=>{
    console.log("connection err", err)
    process.exit();
})

app.get("/", (req, res)=>{
    res.send("Hello")
})

const userRoutes = require("./src/views/view")

app.use('/api', userRoutes)

app.listen(process.env.PORT)