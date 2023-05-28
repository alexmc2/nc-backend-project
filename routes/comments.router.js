const commentsRouter = require('express').Router();

const {
  deleteCommentById,
  updateCommentVotes,
} = require('../controllers/comments.controllers');

commentsRouter
  .route('/:comment_id')
  .delete(deleteCommentById)
  .patch(updateCommentVotes);

module.exports = commentsRouter;
