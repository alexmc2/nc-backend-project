const {
  reviewsById,
  getReviews,
  updateReviewVotes,
  commentsByReviewId,
  userComment,
  newReview,
} = require('../models/reviews.models');

const getReviewsById = (req, res, next) => {
  reviewsById(req.params.review_id)
    .then((review) => {
      res.status(200).send({ review });
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

const getCommentsByReviewId = (req, res, next) => {
  commentsByReviewId(req.params.review_id)
    .then((comments) => {
      if (!comments.length) {
        const err = {
          message: 'Not found!',
          status: 404,
        };
        next(err);
      } else {
        res.status(200).send({ comments });
      }
    })
    .catch((err) => {
      next(err);
    });
};

const postComment = (req, res, next) => {
  const { review_id } = req.params;
  const { username, body } = req.body;
  userComment(review_id, username, body)
    .then((comment) => {
      res.status(201).send({ comment });
    })
    .catch((err) => {
      next(err);
    });
};

const postNewReview = (req, res, next) => {
  const newReviewData = req.body;

  newReview(newReviewData)
    .then((review) => {
      res.status(201).send({ review });
    })
    .catch((err) => {
      console.log(err)
      next(err);
    });
};

module.exports = {
  getReviewsById,
  getAllReviews,
  patchReviewVotes,
  getCommentsByReviewId,
  postComment,
  postNewReview,
};
