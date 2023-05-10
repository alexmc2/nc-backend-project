const express = require('express');
const app = express();
const { getAllCategories } = require('./controllers/categories.controllers'); // Change this line
console.log('getAllCategories:', getAllCategories);

// categories
app.get('/api/categories', getAllCategories);

// catch errors here!
// 404 error
app.all('/*', (req, res, next) => {
  res.status(404).send({ msg: 'This path doesn"t exist!' });
});

app.use((err, req, res, next) => {
  console.log('Error in getAllCategories:', err);
  res.status(500).send('Internal server error!');
});

// app.listen(3000, () => {
//   console.log('Server listening on port 3000');
// });

module.exports = app;
