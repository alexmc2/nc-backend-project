const express = require('express');
const app = express();
const { getAllCategories } = require('./controllers/categories.controllers');
const endpoints = require('./endpoints.json');
const {
  getReviewsById,
  getAllReviews,
  patchReviewVotes,
} = require('./controllers/reviews.controllers');
const {
  notFound,
  handlePSQLErrors,
  handleErrors,
  internalErrors,
} = require('./controllers/errors.controllers');
const {
  getCommentsByReviewId,
  postComment,
  deleteCommentById,
} = require('./controllers/comments.controllers');
const { getTheUsers } = require('./controllers/users.controllers');

app.use(express.json());

app.get('/api', (req, res) => {
  res.status(200).send(endpoints);
});

app.get('/api/reviews', getAllReviews);
app.get('/api/reviews/:review_id', getReviewsById);
app.get('/api/reviews/:review_id/comments', getCommentsByReviewId);
app.get('/api/categories', getAllCategories);
app.post('/api/reviews/:review_id/comments', postComment);
app.patch('/api/reviews/:review_id', patchReviewVotes);
app.delete('/api/comments/:comment_id', deleteCommentById);
app.get('/api/users', getTheUsers);

app.use(notFound);
app.use(handlePSQLErrors);
app.use(handleErrors);
app.use(internalErrors);

module.exports = app;
