import { Request, Response } from 'express';
import Ingredient from "../models/ingredient.model";
import fs from "fs";

const filePath = "./public/img/";

function deleteFile(fileName: string) {
  fs.unlinkSync(filePath + fileName);
}

const IngredientController = {
  list: (req: Request, res: Response) => {
    Ingredient.find({})
      .then((ingredient) => res.json(ingredient))
      .catch((err) => res.send(err));
  },

  find: (req: Request, res: Response) => {
    Ingredient.findById(req.params.id)
      .then((ingredient) => res.json(ingredient))
      .catch((err) => res.send(err));
  },

  create(req: Request, res: Response) {
    Ingredient.create(req.body)
      .then((ingredient) => res.send(ingredient))
      .catch((err) => res.send(err));
  },

  update: (req: Request, res: Response) => {
    req.body.updatedAt = new Date();
    Ingredient.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then((ingredient) => res.json(ingredient))
      .catch((err) => res.send(err));
  },

  delete: (req: Request, res: Response) => {
    Ingredient.findByIdAndRemove(req.params.id)
      .then((ingredient) => {
        res.json(ingredient);
        deleteFile(ingredient.img);
      })
      .catch((err) => res.send(err));
  },
};

export default IngredientController;
