const { reviewsById, getReviews } = require('../models/reviews.models');

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
  getReviews()
    .then((reviews) => {
      res.status(200).send({ reviews });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = {
  getReviewsById,
  getAllReviews,
};
