const { getCategories } = require('../models/categories.models');

// const getAllCategories = (req, res) => {
//   getCategories()
//     .then((categories) => {
//       res.status(200).json({ categories });
//     })
//     .catch((err) => {
//       console.log('Error in getAllCategories:', err);
//       res.status(500).send('cannot retrieve categories from database');
//     });
// };

const getAllCategories = (req, res, next) => {
  getCategories()
    .then((categories) => {
      res.status(200).json({ categories });
    })
    //sending error to middleware function in app.js
    .catch((err) => {
      next(err);
    });
};

module.exports = { getAllCategories };
