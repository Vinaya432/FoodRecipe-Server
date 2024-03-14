const mongoose = require('mongoose')

//create schema for user details

const adminSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
       
    }
})

const admins=mongoose.model("admins",adminSchema)

module.exports=admins