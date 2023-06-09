const app = require('../app');
const request = require('supertest');
const seed = require('../db/seeds/seed');
const data = require('../db/data/test-data');
const db = require('../db/connection');
const endpoints = require('../endpoints.json');

beforeEach(() => seed(data));

afterAll(() => db.end());

describe('404 Not Found', () => {
  it('should respond with status code 404 if endpoint doesn"t exist', () => {
    request(app)
      .get('/api/nonsense')
      .expect(404)
      .then((res) => {
        expect(res.body.msg).toBe('Not found!');
      });
  });
});

describe('GET /categories', () => {
  it('should respond with status code 200', () => {
    return request(app).get('/api/categories').expect(200);
  });

  it('should return an array', () => {
    return request(app)
      .get('/api/categories')
      .expect(200)
      .then(({ body }) => {
        const { categories } = body;
        expect(categories).toBeInstanceOf(Array);
        expect(categories.length).toBe(4);
      });
  });

  it('should return an array of objects with "slug" and "description" as properties', () => {
    return request(app)
      .get('/api/categories')
      .expect(200)
      .then(({ body }) => {
        const { categories } = body;
        categories.forEach((category) => {
          expect(category).toHaveProperty('slug');
          expect(category).toHaveProperty('description');
        });
      });
  });
});

describe('GET /api', () => {
  it('should respond with status code 200 and return JSON object with all the available endpoints', () => {
    return request(app)
      .get('/api')
      .expect(200)
      .then(({ body }) => {
        expect(body).toEqual(endpoints);
      });
  });
});

describe('GET /reviews/:review_id', () => {
  it('should respond with status code 200 and review object when input valid id', () => {
    return request(app)
      .get('/api/reviews/1')
      .expect(200)
      .then(({ body }) => {
        const { review } = body;
        expect(review).toHaveProperty('review_id');
        expect(review).toHaveProperty('title');
        expect(review).toHaveProperty('review_body');
        expect(review).toHaveProperty('designer');
        expect(review).toHaveProperty('review_img_url');
        expect(review).toHaveProperty('votes');
        expect(review).toHaveProperty('category');
        expect(review).toHaveProperty('owner');
        expect(review).toHaveProperty('created_at');
      });
  });
});

it('should respond with status code 404 when input invalid id', () => {
  return request(app)
    .get('/api/reviews/999999')
    .expect(404)
    .then(({ body }) => {
      expect(body.msg).toBe('Not found!');
    });
});

it('should respond with status code 400 for a bad review_id', () => {
  return request(app)
    .get('/api/reviews/dog')
    .expect(400)
    .then(({ body }) => {
      expect(body.msg).toBe('Bad request!');
    });
});

describe('GET /api/reviews', () => {
  it('should respond with status code 200', () => {
    return request(app).get('/api/reviews').expect(200);
  });

  it('should return an array of review objects', () => {
    return request(app)
      .get('/api/reviews')
      .expect(200)
      .then(({ body }) => {
        const { reviews } = body;
        expect(reviews).toBeInstanceOf(Array);
        reviews.forEach((review) => {
          expect(review).toHaveProperty('owner');
          expect(review).toHaveProperty('title');
          expect(review).toHaveProperty('review_id');
          expect(review).toHaveProperty('category');
          expect(review).toHaveProperty('review_img_url');
          expect(review).toHaveProperty('created_at');
          expect(review).toHaveProperty('votes');
          expect(review).toHaveProperty('designer');
          expect(review).toHaveProperty('comment_count');
          expect(review).not.toHaveProperty('review_body');
        });
      });
  });

  it('should return reviews sorted by date in descending order', () => {
    return request(app)
      .get('/api/reviews')
      .expect(200)
      .then(({ body }) => {
        const { reviews } = body;
        expect(reviews).toBeSortedBy('created_at', { descending: true });
      });
  });
});

describe('GET /api/reviews/:review_id/comments', () => {
  it('should respond with status code 200 and return an array of comment objects', () => {
    return request(app)
      .get('/api/reviews/2/comments')
      .expect(200)
      .then(({ body }) => {
        const { comments } = body;
        expect(comments).toBeInstanceOf(Array);
        comments.forEach((comment) => {
          expect(comment).toHaveProperty('comment_id');
          expect(comment).toHaveProperty('votes');
          expect(comment).toHaveProperty('created_at');
          expect(comment).toHaveProperty('author');
          expect(comment).toHaveProperty('body');
        });
      });
  });

  it('should respond with status code 404 when input non-existent review id', () => {
    return request(app)
      .get('/api/reviews/999999/comments')
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe('Not found!');
      });
  });

  it('should respond with status code 400 when input bad review id', () => {
    return request(app)
      .get('/api/reviews/dog/comments')
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe('Bad request!');
      });
  });
});

describe('POST /api/reviews/:review_id/comments', () => {
  it('should respond with status code 201 and return the posted comment', () => {
    const newComment = {
      username: 'mallionaire',
      body: 'Enjoyed this game',
    };
    return request(app)
      .post('/api/reviews/1/comments')
      .send(newComment)
      .expect(201)
      .then(({ body }) => {
        const { comment } = body;
        expect(comment).toHaveProperty('comment_id');
        expect(comment).toHaveProperty('votes');
        expect(comment).toHaveProperty('created_at');
        expect(comment).toHaveProperty('author');
        expect(comment).toHaveProperty('body');
        expect(comment.author).toBe(newComment.username);
        expect(comment.body).toBe(newComment.body);
      });
  });
});

describe('PATCH /api/reviews/:review_id', () => {
  it('should respond with status code 200 and return the updated review', () => {
    const newVotes = { inc_votes: 1 };
    return request(app)
      .patch('/api/reviews/1')
      .send(newVotes)
      .expect(200)
      .then(({ body }) => {
        const { updatedReview } = body;
        expect(updatedReview).toHaveProperty('votes');
        expect(updatedReview.votes).toBe(2);
        expect(updatedReview).toEqual({
          review_id: 1,
          title: 'Agricola',
          category: 'euro game',
          designer: 'Uwe Rosenberg',
          owner: 'mallionaire',
          review_body: 'Farmyard fun!',
          review_img_url:
            'https://images.pexels.com/photos/974314/pexels-photo-974314.jpeg?w=700&h=700',
          created_at: '2021-01-18T10:00:20.514Z',
          votes: 2,
        });
      });
  });

  it('should respond with status code 400 when input invalid review id', () => {
    const newVotes = { inc_votes: 1 };
    return request(app)
      .patch('/api/reviews/dog')
      .send(newVotes)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe('Bad request!');
      });
  });

  it('should respond with status code 400 when input invalid vote increment', () => {
    const newVotes = { inc_votes: 'one' };
    return request(app)
      .patch('/api/reviews/1')
      .send(newVotes)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe('Bad request!');
      });
  });

  it('should respond with status code 404 when input review id that does not exist', () => {
    const newVotes = { inc_votes: 1 };
    return request(app)
      .patch('/api/reviews/9999')
      .send(newVotes)
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe('Not found!');
      });
  });
});

describe('DELETE /api/comments/:comment_id', () => {
  it('should respond with status code 204 when comment is successfully deleted', () => {
    return request(app).delete('/api/comments/1').expect(204);
  });

  it('should respond with status code 404 when input non-existent comment id', () => {
    return request(app)
      .delete('/api/comments/999999')
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe('Not found!');
      });
  });

  it('should respond with status code 400 when input invalid comment id', () => {
    return request(app)
      .delete('/api/comments/dog')
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe('Bad request!');
      });
  });
});
describe('GET /api/users', () => {
  it('should respond with status code 200', () => {
    return request(app).get('/api/users').expect(200);
  });

  it('should return an array', () => {
    return request(app)
      .get('/api/users')
      .expect(200)
      .then(({ body }) => {
        const { users } = body;
        expect(users).toBeInstanceOf(Array);
      });
  });

  it('should return an array of user objects with "username", "name" and "avatar_url" as properties', () => {
    return request(app)
      .get('/api/users')
      .expect(200)
      .then(({ body }) => {
        const { users } = body;
        users.forEach((user) => {
          expect(user).toHaveProperty('username');
          expect(user).toHaveProperty('name');
          expect(user).toHaveProperty('avatar_url');
        });
      });
  });
});

describe('GET /api/reviews (queries)', () => {
  it('should respond with status code 200', () => {
    return request(app).get('/api/reviews').expect(200);
  });

  it('should return an array of review objects', () => {
    return request(app)
      .get('/api/reviews')
      .expect(200)
      .then(({ body }) => {
        const { reviews } = body;
        expect(reviews).toBeInstanceOf(Array);
        reviews.forEach((review) => {
          expect(review).toHaveProperty('owner');
          expect(review).toHaveProperty('title');
          expect(review).toHaveProperty('review_id');
          expect(review).toHaveProperty('category');
          expect(review).toHaveProperty('review_img_url');
          expect(review).toHaveProperty('created_at');
          expect(review).toHaveProperty('votes');
          expect(review).toHaveProperty('designer');
          expect(review).toHaveProperty('comment_count');
          expect(review).not.toHaveProperty('review_body');
        });
      });
  });

  it('should return reviews sorted by date in descending order by default', () => {
    return request(app)
      .get('/api/reviews')
      .expect(200)
      .then(({ body }) => {
        const { reviews } = body;
        expect(reviews).toBeSortedBy('created_at', { descending: true });
      });
  });

  it('should return reviews sorted by the sort_by query', () => {
    const sortBy = 'review_id';
    return request(app)
      .get(`/api/reviews?sort_by=${sortBy}`)
      .expect(200)
      .then(({ body }) => {
        const { reviews } = body;
        expect(reviews).toBeSortedBy(sortBy, { descending: true });
      });
  });

  it('should return reviews sorted in ascending order when order query is set to "asc"', () => {
    const order = 'asc';
    return request(app)
      .get(`/api/reviews?order=${order}`)
      .expect(200)
      .then(({ body }) => {
        const { reviews } = body;
        expect(reviews).toBeSortedBy('created_at', { descending: false });
      });
  });
  it('should respond with status code 404 when no reviews are found for the category', () => {
    const category = 'nonsense';
    return request(app)
      .get(`/api/reviews?category=${category}`)
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe('Not found!');
      });
  });
});

describe('GET /reviews/:review_id (comment count)', () => {
  it('should respond with a comment_count property and status 200', () => {
    const reviewId = 4;

    return request(app)
      .get(`/api/reviews/${reviewId}`)
      .expect(200)
      .then(({ body }) => {
        const { review } = body;
        expect(review).toHaveProperty('comment_count');
        expect(typeof review.comment_count).toBe('number');
      });
  });
});

describe('GET /api/users/:username', () => {
  it('should return the user object and respond with status 200', () => {
    const username = 'mallionaire';
    return request(app)
      .get(`/api/users/${username}`)
      .expect(200)
      .then(({ body }) => {
        const { user } = body;
        expect(user).toHaveProperty('username', username);
        expect(user).toHaveProperty('name');
        expect(user).toHaveProperty('avatar_url');
      });
  });

  it('should respond with status code 404 when user not found', () => {
    const username = 'imposter';
    return request(app)
      .get(`/api/users/${username}`)
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe('Not found!');
      });
  });
});

describe('PATCH /api/comments/:comment_id', () => {
  it('should return the updated comment and respond with status code 200', () => {
    const commentId = 2;
    const incVotes = 1;

    return request(app)
      .patch(`/api/comments/${commentId}`)
      .send({ inc_votes: incVotes })
      .expect(200)
      .then(({ body }) => {
        console.log({ body });
        const updatedComment = body.comment[0];
        console.log(updatedComment);

        expect(updatedComment.comment_id).toBe(commentId);
        expect(updatedComment.votes).toBe(14);
        expect(body.comment.length).toBe(1);
      });
  });

  it('should respond with status code 400 when input invalid comment id', () => {
    const invalidCommentId = 'dog';
    const newVotes = { inc_votes: 1 };

    return request(app)
      .patch(`/api/comments/${invalidCommentId}`)
      .send(newVotes)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe('Bad request!');
      });
  });

  it('should respond with status code 404 when comment id does not exist', () => {
    const doesNotExist = 9999;
    const newVotes = { inc_votes: 1 };

    return request(app)
      .patch(`/api/comments/${doesNotExist}`)
      .send(newVotes)
      .expect(404)
      .then(({ body }) => {
        console.log({ body });
        expect(body.msg).toBe('Not found!');
      });
  });
});
describe('POST /api/reviews', () => {
  it('should respond with status code 201 and return the newly created review', () => {
    const newReview = {
      owner: 'dav3rid',
      title:
        'Blood on the Clocktower - an Intriguing and Engaging Social Deduction Game',
      category: 'social deduction',
      review_img_url:
        'https://images.pexels.com/photos/5350049/pexels-photo-5350049.jpeg?w=700&h=700',
      review_body:
        "Finally, a social deduction game for everyone, including the people who don't like social deduction games.",
      designer: 'The Pandemonium Institute',
    };

    return request(app)
      .post('/api/reviews')
      .send(newReview)
      .expect(201)
      .then((response) => {
        const { review } = response.body;
        expect(review).toHaveProperty('review_id');
        expect(review).toHaveProperty('title');
        expect(review).toHaveProperty('category');
        expect(review).toHaveProperty('designer');
        expect(review).toHaveProperty('owner');
        expect(review).toHaveProperty('review_body');
        expect(review).toHaveProperty('review_img_url');
        expect(review).toHaveProperty('created_at');
        expect(review).toHaveProperty('votes');
      });
  });
});
