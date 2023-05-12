const db = require('../db/connection');

const getCommentByReviewId = (review_id) => {
  return db
  .query('SELECT * FROM comments WHERE review_id = $1', [review_id])
  .then((result) => {
    console.log(result)
    return result.rows[0];
  });
};


module.exports = {
    getCommentByReviewId,
  };