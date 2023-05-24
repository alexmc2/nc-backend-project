const { getUsers } = require('../models/users.models');

const getTheUsers = (req, res, next) => {
  getUsers()
    .then((users) => {
      res.status(200).send({ users });
    })
    .catch(next);
};

module.exports = {
  getTheUsers,
};