const mongoose = require('mongoose')

const favRecipeschema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        
    },
    description:{
        type:String,
        required:true
    },
    ingredients:{
        type:Array,
        required:true
    },
    cookingTime:{
        type:String,
        required:true
    },
    reciepeImage:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true
    }
})

const favs= mongoose.model("favs",favRecipeschema)
module.exports = favs
