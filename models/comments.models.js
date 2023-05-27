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
module.exports = {
  deleteComment,
};
