const db = require('../db/connection');

//query the database to get the categories
const getCategories = () => {
  return db.query('SELECT * FROM categories').then((result) => {
    console.log('result:', result.rows);
    return result.rows;
  });
};
// // just to see if it's working
// getCategories()
//   .then((categories) => {
//     console.log('Categories:', categories);
//   })
//   .catch((err) => {
//     console.log('Error:', err);
//   });

module.exports = {
  getCategories,
};
