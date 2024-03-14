const favs= require('../Models/favRecipeModel')

//add to favorites

exports.addToFavRecipecontroller = async (req,res)=>{
    console.log("inside fav recipe controller");
    const {id,title,description,ingredients,cookingTime,reciepeImage, category} =req.body
    // const reciepeImage = req.file.filename
    const userId = req.payload

    try {
        console.log("inside fav recipe controller");
        const existingRecipe = await favs.findOne({title,userId})
        if (existingRecipe) {
            res.status(406).json("Recipe Already added to favourite...")
        } else {
            const newRecipe = new favs({ title,description,ingredients,cookingTime,reciepeImage, category,userId })
            console.log("New fav Recipe: ", newRecipe);
            await newRecipe.save()
            res.status(200).json(newRecipe)
        }
    } catch (error) {
        console.log(error);
        res.status(401).json(error)
    }
}

//get recipes frm fav
exports.getFavController = async (req,res)=>{
    const userId = req.payload
    try {
        const allRecipes= await favs.find({userId})
        res.status(200).json(allRecipes)
        
    } catch (error) {
        res.status(401).json(error)
    }
}

//delete from fav
exports.deleteRecipe = async (req, res) => {
    const { rid } = req.params
    try {
        const deleteData = await favs.findByIdAndDelete({ _id: rid })
        res.status(200).json(deleteData)
    } catch (err) {
        res.status(401).json(err)
    }
}


