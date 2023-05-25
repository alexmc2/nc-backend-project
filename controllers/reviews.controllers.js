const {
  reviewsById,
  getReviews,
  updateReviewVotes,
} = require('../models/reviews.models');

const getReviewsById = (req, res, next) => {
  reviewsById(req.params.review_id)
    .then((review) => {
      if (!review) {
        const err = {
          message: 'Not found!',
          status: 404,
        };
        next(err);
      } else {
        res.status(200).send({ review });
      }
    })
    .catch((err) => {
      next(err);
    });
};

const getAllReviews = (req, res, next) => {
  const { category, sort_by, order } = req.query;
  getReviews(category, sort_by, order)
    .then((reviews) => {
      res.status(200).send({ reviews });
    })
    .catch((err) => {
      next(err);
    });
};

const patchReviewVotes = (req, res, next) => {
  const reviewId = req.params['review_id'];
  const { inc_votes: increaseVotesBy } = req.body;

  updateReviewVotes(reviewId, increaseVotesBy)
    .then((updatedReview) => {
      res.status(200).send({ updatedReview: updatedReview });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = {
  getReviewsById,
  getAllReviews,
  patchReviewVotes,
};
