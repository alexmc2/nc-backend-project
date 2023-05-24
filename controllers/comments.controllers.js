const {
  commentsByReviewId,
  userComment,
  deleteComment,
} = require('../models/comments.models');

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
const deleteCommentById = (req, res, next) => {
  const { comment_id } = req.params;

  deleteComment(comment_id)
    .then(() => {
      res.status(204).end();
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = {
  getCommentsByReviewId,
  postComment,
  deleteCommentById,
};
