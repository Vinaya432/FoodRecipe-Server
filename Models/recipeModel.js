const mongoose = require('mongoose')

const recipeSchema = new mongoose.Schema({
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
    },
    timestamp:{
        type:String,
        required:true
        
    },
    username:{
        type:String,
        required:true
    }
})

const recipes= mongoose.model("recipes",recipeSchema)

module.exports=recipes