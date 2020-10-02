import { Request, Response } from 'express';
import Recipe from "../models/recipe.model";

const RecipeController = {
  list: (req: Request, res: Response) => {
    Recipe.find({})
      .populate("uploader", "username")
      .populate("ingredient.ingredient", "name unit")
      .then((orders) => res.json(orders))
      .catch((err) => res.send(err));
  },

  find: (req: Request, res: Response) => {
    Recipe.findById(req.params.id)
      .populate("uploader", "username")
      .populate("ingredient.ingredient", "name unit")
      .then((recipe) => res.json(recipe))
      .catch((err) => res.send(err));
  },

  create: (req: Request, res: Response) => {
    Recipe.create(req.body)
      .then((recipe) => res.json(recipe))
      .catch((err) => res.send(err));
  },

  update: (req: Request, res: Response) => {
    Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .populate("uploader", "username")
      .populate("ingredient.ingredient", "name unit")
      .then((recipe) => res.json(recipe))
      .catch((err) => res.send(err));
  },

  delete: (req: Request, res: Response) => {
    Recipe.findByIdAndRemove(req.params.id)
      .then((recipe) => res.json(recipe))
      .catch((err) => res.send(err));
  },
};
export default RecipeController;