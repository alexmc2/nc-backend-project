const usersRouter = require('express').Router();

const { getTheUsers } = require('../controllers/users.controllers');

usersRouter.route('/').get(getTheUsers);

module.exports = usersRouter;
