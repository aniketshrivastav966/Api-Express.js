const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    name:String,
    username:String,
    email:String,
    password:String,
    isAdmin:Boolean
})
const User= mongoose.model("User", UserSchema)
module.exports = {User};

