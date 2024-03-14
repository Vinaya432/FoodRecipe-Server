const express = require('express')
const router = express.Router()
const userControllers = require('../Controllers/userControllers')
const jwtMiddleware = require('../Middlewares/jwtMiddleware')
const multerConfig = require('../Middlewares/multerMiddleware')
const recipeController = require('../Controllers/recipeController')
const favrecipecontroller = require('../Controllers/favrecipeController')


//register
router.post('/register',userControllers.register)

//login
router.post('/login',userControllers.login)

//add recipe
router.post('/addrecipe',jwtMiddleware,multerConfig.single('reciepeImage'),recipeController.addRecipe)

//get all recipes
router.get('/all-recipes',jwtMiddleware,recipeController.getAllRecipes)

//get categorized recipes
router.get('/get-category-recipes',recipeController.getcategoryRecipes)

//user recipes
router.get('/user-recipe',jwtMiddleware,recipeController.getUserRecipes)

//get a single recipe
router.get('/recipe/:rid',jwtMiddleware,recipeController.getSingleRecipe)

//update a recipe
router.put('/userrecipe/edit/:rid',jwtMiddleware,multerConfig.single("reciepeImage"),recipeController.editRecipe)

//delete recipe
router.delete('/userrecipe/delete/:rid',jwtMiddleware,recipeController.deleteRecipe)

//update profile
router.put('/user/edit',jwtMiddleware,multerConfig.single("profile"),userControllers.editUser)

//add to fav recipe
router.post('/add-to-fav',jwtMiddleware,favrecipecontroller.addToFavRecipecontroller)

//get fav recipes
router.get('/favrecipe-list',jwtMiddleware,favrecipecontroller.getFavController)

//remove frm fav
router.delete('/favrecipe/delete/:rid',jwtMiddleware,favrecipecontroller.deleteRecipe)

//get all recipes in admin
router.get('/get-all-recipes',jwtMiddleware,recipeController.getAllRecipesAdmin)


module.exports=router