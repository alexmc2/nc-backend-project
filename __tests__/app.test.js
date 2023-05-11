const app = require('../app');
const request = require('supertest');
const seed = require('../db/seeds/seed');
const data = require('../db/data/test-data');
const db = require('../db/connection');

beforeEach(() => seed(data));

afterAll(() => db.end());

describe('404 Not Found', () => {
  it('should respond with status code 404 if endpoint doesn"t exist', () => {
    request(app)
      .get('/api/nonsense')
      .expect(404)
      .then((res) => {
        expect(res.body.msg).toBe('This path doesn"t exist!');
      });
  });
});

describe('GET /categories', () => {
  it('should respond with status code 200', () => {
    return request(app)
      .get('/api/categories')
      .expect(200)
      .then(() => {});
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
