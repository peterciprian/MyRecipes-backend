const recipeRouter = require('express').Router();
const RecipeController = require('../controller/recipe.controller');
const permission = require('permission');

recipeRouter.get('/', permission(), RecipeController.list);
recipeRouter.get('/:id', permission(), RecipeController.find);
recipeRouter.post('/', permission(), RecipeController.create);
recipeRouter.put('/update/:id', permission(), RecipeController.update);
recipeRouter.delete('/delete/:id', permission(), RecipeController.delete);

export default recipeRouter;