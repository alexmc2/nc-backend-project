const usersRouter = require('express').Router();

const {
  getTheUsers,
  getUserByUsername,
} = require('../controllers/users.controllers');

usersRouter.route('/').get(getTheUsers);
usersRouter.route('/:username').get(getUserByUsername);

module.exports = usersRouter;
