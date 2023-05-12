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

module.exports = {
  commentsByReviewId,
};
