const { commentsByReviewId } = require('../models/comments.models');

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

module.exports = {
  getCommentsByReviewId,
};
