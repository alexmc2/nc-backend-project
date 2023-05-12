const db = require('../db/connection');

const reviewsById = (review_id) => {
  return db
    .query('SELECT * FROM reviews WHERE review_id = $1', [review_id])
    .then((result) => {
      return result.rows[0];
    });
};

const getReviews = () => {
  return db
    .query(
      `
      SELECT 
        owner, 
        title, 
        review_id, 
        category, 
        review_img_url, 
        created_at, 
        votes, 
        designer, 
        (SELECT COUNT(*) FROM comments WHERE comments.review_id = reviews.review_id) AS comment_count
      FROM reviews 
      ORDER BY created_at DESC
    `
    )
    .then((result) => {
      return result.rows;
    });
};

module.exports = {
  reviewsById,
  getReviews,
};
