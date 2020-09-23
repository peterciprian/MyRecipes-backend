const ingredientRouter = require('express').Router();
const IngredientController = require('../controller/ingredient.controller');
const permission = require('permission');

ingredientRouter.get('/', IngredientController.list);
ingredientRouter.get('/:id', IngredientController.find);
ingredientRouter.post('/', permission('admin'), IngredientController.create);
ingredientRouter.put('/:id', permission('admin'), IngredientController.update);
ingredientRouter.delete('/:id', permission('admin'), IngredientController.delete);

module.exports = ingredientRouter;