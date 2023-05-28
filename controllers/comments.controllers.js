const { deleteComment, updateVotes } = require('../models/comments.models');

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

const updateCommentVotes = (req, res, next) => {
  const votes = req.body.inc_votes;
  const { comment_id } = req.params;
  updateVotes(comment_id, votes)
    .then((comment) => {
      res.status(200).send({ comment });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = {
  deleteCommentById,
  updateCommentVotes,
};
