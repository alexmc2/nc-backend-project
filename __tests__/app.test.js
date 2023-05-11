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
