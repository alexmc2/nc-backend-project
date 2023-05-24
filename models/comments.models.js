const db = require('../db/connection');

const commentsByReviewId = (review_id) => {
  return db
    .query(
      'SELECT * FROM comments WHERE review_id = $1 ORDER BY created_at DESC',
      [review_id]
    )
    .then((result) => {
      return result.rows;
    });
};

const userComment = (review_id, username, body) => {
  return db
    .query(
      `INSERT INTO comments (review_id, author, body) 
         VALUES ($1, $2, $3) 
         RETURNING *;`,
      [review_id, username, body]
    )
    .then((result) => {
      return result.rows[0];
    });
};

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
  commentsByReviewId,
  userComment,
  deleteComment,
};
