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

const updateReviewVotes = (review_id, inc_votes) => {
  const query = `UPDATE reviews SET votes = votes + $1 WHERE review_id = $2 RETURNING *`;
  return db.query(query, [inc_votes, review_id]).then((result) => {
    if (result.rows.length === 0) {
      const err = new Error('Not Found!');
      err.status = 404;
      throw err;
    }

    return result.rows[0];
  });
};

module.exports = {
  reviewsById,
  getReviews,
  updateReviewVotes,
};
