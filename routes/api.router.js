const apiRouter = require('express').Router();
const categoriesRouter = require('./categories.router');
const usersRouter = require('./users.router');
const reviewsRouter = require('./reviews.router');
const commentsRouter = require('./comments.router');

apiRouter.use('/reviews', reviewsRouter);
apiRouter.use('/comments', commentsRouter);
apiRouter.use('/categories', categoriesRouter);
apiRouter.use('/users', usersRouter);

module.exports = apiRouter;
