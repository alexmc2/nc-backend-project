const reviewsRouter = require('express').Router();
const {
  getReviewsById,
  getAllReviews,
  patchReviewVotes,
  getCommentsByReviewId,
  postComment,
} = require('../controllers/reviews.controllers');

reviewsRouter.route('/').get(getAllReviews);
reviewsRouter.route('/:review_id').get(getReviewsById).patch(patchReviewVotes);

reviewsRouter
  .route('/:review_id/comments')
  .get(getCommentsByReviewId)
  .post(postComment);

module.exports = reviewsRouter;
