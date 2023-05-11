const { getCategories } = require('../models/categories.models');


const getAllCategories = (req, res, next) => {
  getCategories()
    .then((categories) => {
      res.status(200).send({ categories });
    })

    .catch((err) => {
      next(err);
    });
};

module.exports = { getAllCategories };
