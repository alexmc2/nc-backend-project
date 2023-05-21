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
    //console.log('userComment:', { review_id, username, body });
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
  
module.exports = {
  commentsByReviewId,
  userComment
};
