const Ingredient = require("../models/ingredient.model");
const fs = require("fs");

const filePath = "./public/img/";

function deleteFile(fileName) {
  fs.unlinkSync(filePath + fileName);
}

module.exports = {
  list: (req, res) => {
    Ingredient.find({})
      .then((ingredient) => res.json(ingredient))
      .catch((err) => res.send(err));
  },

  find: (req, res) => {
    Ingredient.findById(req.params.id)
      .then((ingredient) => res.json(ingredient))
      .catch((err) => res.send(err));
  },

  create(req, res) {
    Ingredient.create(req.body)
      .then((ingredient) => res.send(ingredient))
      .catch((err) => res.send(err));
  },

  update: (req, res) => {
    req.body.updatedAt = new Date();
    Ingredient.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then((ingredient) => res.json(ingredient))
      .catch((err) => res.send(err));
  },

  delete: (req, res) => {
    Ingredient.findByIdAndRemove(req.params.id)
      .then((ingredient) => {
        res.json(ingredient);
        deleteFile(ingredient.img);
      })
      .catch((err) => res.send(err));
  },
};
