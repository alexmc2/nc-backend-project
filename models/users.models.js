const db = require('../db/connection');

const getUsers = () => {
  return db
    .query('SELECT username, name, avatar_url FROM users;')
    .then((result) => result.rows);
};

const userByUsername = (username) => {
  return db
    .query(
      'SELECT username, name, avatar_url FROM users WHERE username = $1;',
      [username]
    )
    .then((result) => {
      const user = result.rows[0];
      if (!user) {
        const err = new Error('Not found!');
        err.status = 404;
        throw err;
      }
      return user;
    });
};

module.exports = {
  getUsers,
  userByUsername,
};
