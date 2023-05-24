const db = require('../db/connection');

const getUsers = () => {
  return db
    .query('SELECT username, name, avatar_url FROM users;')
    .then((result) => result.rows);
};

module.exports = {
  getUsers,
};
