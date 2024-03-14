const recipes = require('../Models/recipeModel')

//add recipe
exports.addRecipe = async (req, res) => {
    console.log("Inside Add Recipe");

    const { title, description, ingredients, cookingTime, category, timestamp, username } = req.body
    const reciepeImage = req.file.filename
    const userId = req.payload

    try {
        const existingRecipe = await recipes.findOne({ title })
        if (existingRecipe) {
            res.status(406).json("Recipe Already Exists!!!")
        } else {
            const newRecipe = new recipes({ title, description, ingredients, cookingTime, reciepeImage, category, userId, timestamp, username })
            console.log("New Recipe: ", newRecipe);
            await newRecipe.save()
            res.status(200).json(newRecipe)
        }

    } catch (err) {
        res.status(401).json(err)
    }
}

//get all recipes
exports.getAllRecipes = async (req, res) => {
    const searchKey = req.query.search
    // const category = req.query.category;
    // console.log("category type: ", category);
    console.log(searchKey);


    try {
        let query = {}
        if (searchKey) {
            query.title = { $regex: searchKey, $options: "i" }
        }
        // if (category && category !== 'null') {
        //     query.category = category;
        //     console.log("category: ", query.category);
        // }

        console.log("Query", query);
        const allRecipes = await recipes.find(query)
        // console.log("Inside all recipes api controleer:",allRecipes);
        res.status(200).json(allRecipes)
    } catch (err) {
        res.status(401).json(err)
    }
}

//get categorized recipes
exports.getcategoryRecipes = async(req,res)=>{
    const category = req.query.category;
    try {
        let query = {}
        if (category && category !== 'null') {
            query.category = category;
            console.log("category: ", query.category);
        }
        const categorizedRecipes = await recipes.find(query)
        
        res.status(200).json(categorizedRecipes)
        
    } catch (error) {
        res.status(401).json(error)
    }
}

//get user recipes
exports.getUserRecipes = async (req, res) => {
    const userId = req.payload

    try {
        const userRecipes = await recipes.find({ userId })
        res.status(200).json(userRecipes)
    } catch (err) {
        res.status(401).json(err)
    }
}

//get a single recipe Details
exports.getSingleRecipe = async (req, res) => {
    const { rid } = req.params
    try {
        const singleRecipe = await recipes.findById({ _id: rid })
        res.status(200).json(singleRecipe)
    } catch (err) {
        res.status(401).json(err)
    }
}

//edit user recipes
exports.editRecipe = async (req, res) => {
    const { title, description, ingredients, cookingTime, category, reciepeImage, username, timestamp } = req.body
    const uploadImage = req.file ? req.file.filename : reciepeImage
    const userId = req.payload
    const { rid } = req.params

    try {
        const updatedRecipe = await recipes.findByIdAndUpdate({ _id: rid }, { title, description, ingredients, cookingTime, reciepeImage: uploadImage, category, userId, timestamp, username }, { new: true })
        await updatedRecipe.save()
        res.status(200).json(updatedRecipe)

    } catch (err) {
        res.status(401).json(err)
    }
}


//delete recipe
exports.deleteRecipe = async (req, res) => {
    const { rid } = req.params
    try {
        const deleteData = await recipes.findByIdAndDelete({ _id: rid })
        res.status(200).json(deleteData)
    } catch (err) {
        res.status(401).json(err)
    }
}

//get all recipes in admin panel
exports.getAllRecipesAdmin = async (req, res) => {
    try {
        const allRecipes = await recipes.find()
        res.status(200).json(allRecipes)
    } catch (err) {
        res.status(401).json(err)
    }
}

