const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
})

const User = mongoose.model("users",userSchema)

const generateToken = (user) => {
      return jwt.sign({user},process.env.Secret_KEY,{expiresIn:"2d"})
}

module.exports = {User,generateToken}