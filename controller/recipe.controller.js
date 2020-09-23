const Recipe = require("../models/recipe.model");
const mongoose = require("mongoose");
mongoose.Promise = require("bluebird");

module.exports = {
  list: (req, res) => {
    Recipe.find({})
      .populate("uploader", "username")
      .populate("ingredient.ingredient", "name unit")
      .then((orders) => res.json(orders))
      .catch((err) => res.send(err));
  },

  find: (req, res) => {
    Recipe.findById(req.params.id)
      .populate("uploader", "username")
      .populate("ingredient.ingredient", "name unit")
      .then((recipe) => res.json(recipe))
      .catch((err) => res.send(err));
  },

  create: (req, res) => {
    Recipe.create(req.body)
      .then((recipe) => res.json(recipe))
      .catch((err) => res.send(err));
  },

  update: (req, res) => {
    Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .populate("uploader", "username")
      .populate("ingredient.ingredient", "name unit")
      .then((recipe) => res.json(recipe))
      .catch((err) => res.send(err));
  },

  delete: (req, res) => {
    Recipe.findByIdAndRemove(req.params.id)
      .then((recipe) => res.json(recipe))
      .catch((err) => res.send(err));
  },
};
