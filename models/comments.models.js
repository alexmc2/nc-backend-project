const db = require('../db/connection');

const deleteComment = (comment_id) => {
  return db
    .query('DELETE FROM comments WHERE comment_id = $1 RETURNING*;', [
      comment_id,
    ])
    .then((res) => {
      if (res.rows.length === 0) {
        const err = new Error('Not found!');
        err.status = 404;
        throw err;
      }
    });
};

const updateVotes = (commentId, inc_votes) => {
  return db
    .query(
      `UPDATE comments 
       SET votes = votes + $2
       WHERE comment_id = $1
       RETURNING *`,
      [commentId, inc_votes]
    )
    .then((res) => {
      if (res.rows.length === 0) {
        const err = new Error('Not found!');
        err.status = 404;
        throw err;
      }
      return res.rows;
    });
};

module.exports = {
  deleteComment,
  updateVotes,
};
