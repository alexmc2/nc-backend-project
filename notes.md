## GET /categories - FLOW

A request is made to the /api/categories route.

The getAllCategories function (categories.controller.js) executed.

If error retrieving categories, the catch block executed - next(err) is called.

Express finds next error handling MW function in stack.

Error handling MW in app.js is executed((err, req, res, next) => { ..- })



## Endpoints

GET /api: 

GET /api/categories: 

Serves an array of all categories. 

Each category has a slug and a description which describes the category.

GET /api/reviews: 

Endpoint serves an array of all reviews. 

Review has title, designer, owner, review_img_url, category, created_at, votes

## Endpoints to add

GET /api/users: 

Endpoint serves an array of all users. Each user has a username, name, and avatar_url.

GET /api/reviews/:review_id/comments: 

Endpoint serves an array of all comments for a specific review.


## Structure:

https://dbdiagram.io/d/645c1e6cdca9fb07c4de35cd

CREATE TABLE `categories` (
  `slug` VARCHAR PRIMARY KEY,
  `description` VARCHAR
);

CREATE TABLE `users` (
  `username` VARCHAR PRIMARY KEY,
  `name` VARCHAR,
  `avatar_url` VARCHAR
);

CREATE TABLE `reviews` (
  `review_id` SERIAL PRIMARY KEY,
  `title` VARCHAR,
  `category` VARCHAR,
  `designer` VARCHAR,
  `owner` VARCHAR,
  `review_body` VARCHAR,
  `review_img_url` VARCHAR,
  `created_at` TIMESTAMP,
  `votes` INTEGER
);

CREATE TABLE `comments` (
  `comment_id` SERIAL PRIMARY KEY,
  `body` VARCHAR,
  `review_id` INTEGER,
  `author` VARCHAR,
  `votes` INTEGER,
  `created_at` TIMESTAMP
);

ALTER TABLE `reviews` ADD FOREIGN KEY (`category`) REFERENCES `categories` (`slug`);

ALTER TABLE `reviews` ADD FOREIGN KEY (`owner`) REFERENCES `users` (`username`);

ALTER TABLE `comments` ADD FOREIGN KEY (`review_id`) REFERENCES `reviews` (`review_id`);

ALTER TABLE `comments` ADD FOREIGN KEY (`author`) REFERENCES `users` (`username`);



## Errors /review_id - FLOW

getReviewsById function attempts to fetch review by ID

If not found, creates error object

Passes this to the next MW with next(err).

Error MW (errors.controllers.js) receives error object 

Sends response with status code and message from the error object.



## Relevant HTTP Status Codes

- 200 OK
- 201 Created
- 204 No Content
- 400 Bad Request
- 404 Not Found
- 405 Method Not Allowed
- 418 I'm a teapot
- 422 Unprocessable Entity
- 500 Internal Server Error

## GET `/api/reviews/:review_id`

- Bad `review_id` (e.g. `/dog`)
- Well formed `review_id` that doesn't exist in the database (e.g. `/999999`)
