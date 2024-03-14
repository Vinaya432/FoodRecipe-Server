const mongoose = require('mongoose')

//create schema for user details

const userSchema = new mongoose.Schema({
    username:{
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
    },
    profile:{
        type:String
    },
    instagram:{
        type:String
    },
    facebook:{
        type:String
    },
    role:{
        type:String,
        required:true
    }
})

const users=mongoose.model("users",userSchema)

module.exports=users