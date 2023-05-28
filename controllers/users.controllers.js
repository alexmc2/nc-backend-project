const { getUsers, userByUsername } = require('../models/users.models');

const getTheUsers = (req, res, next) => {
  getUsers()
    .then((users) => {
      res.status(200).send({ users });
    })
    .catch(next);
};
const getUserByUsername = (req, res, next) => {
  const { username } = req.params;
  userByUsername(username)
    .then((user) => {
      res.status(200).send({ user });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = {
  getTheUsers,
  getUserByUsername,
};
