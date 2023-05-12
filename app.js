const express = require('express');
const app = express();
const { getAllCategories } = require('./controllers/categories.controllers');
const endpoints = require('./endpoints.json');
const {
  getReviewsById,
  getAllReviews,
} = require('./controllers/reviews.controllers');
const {
  notFound,
  handlePSQLErrors,
  handleErrors,
  internalErrors,
} = require('./controllers/errors.controllers');
const { getCommentsByReviewId } = require('./controllers/comments.controllers');

app.get('/api', (req, res) => {
  res.status(200).send(endpoints);
});

app.get('/api/reviews', getAllReviews);
app.get('/api/reviews/:review_id', getReviewsById);
app.get('/api/reviews/:review_id/comments', getCommentsByReviewId);
app.get('/api/categories', getAllCategories);

app.use(notFound);
app.use(handlePSQLErrors);
app.use(handleErrors);
app.use(internalErrors);

// app.listen(3000, () => {
//   console.log('port listening on 3000');
// });

module.exports = app;
