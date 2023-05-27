const db = require('../db/connection');

const reviewsById = (review_id) => {
  return db
    .query(
      `
      SELECT reviews.*, COUNT(comments.comment_id) AS comment_count
      FROM reviews
      LEFT JOIN comments ON reviews.review_id = comments.review_id
      WHERE reviews.review_id = $1
      GROUP BY reviews.review_id
      `,
      [review_id]
    )
    .then((result) => {
      const review = result.rows[0];
      if (!review) {
        const err = new Error('Not found!');
        err.status = 404;
        throw err;
      }
      review.comment_count = Number(review.comment_count);
      return review;
    });
};

const getReviews = (category, sortBy = 'created_at', order = 'desc') => {
  let reviewQuery = `
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
  `;

  const queryParams = [];

  if (category) {
    reviewQuery += 'WHERE category = $1 ';
    queryParams.push(category);
  }

  reviewQuery += `ORDER BY ${sortBy} ${order}`;

  return db.query(reviewQuery, queryParams).then((result) => {
    if (result.rows.length === 0 && category) {
      const err = new Error('Not found!');
      err.status = 404;
      throw err;
    }
    return result.rows;
  });
};

const updateReviewVotes = (review_id, inc_votes) => {
  const query = `UPDATE reviews SET votes = votes + $1 WHERE review_id = $2 RETURNING *`;
  return db.query(query, [inc_votes, review_id]).then((result) => {
    if (result.rows.length === 0) {
      const err = new Error('Not found!');
      err.status = 404;
      throw err;
    }

    return result.rows[0];
  });
};

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

module.exports = {
  reviewsById,
  getReviews,
  updateReviewVotes,
  commentsByReviewId,
  userComment,
};
