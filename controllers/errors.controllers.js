const app = require('../app');

const notFound = (req, res, next) => {
  res.status(404).send({ msg: 'Not found!' });
};

const handlePSQLErrors = (err, req, res, next) => {
  const psqlBadRequestCodes = ['22P02'];

  if (psqlBadRequestCodes.includes(err.code)) {
    res.status(400).send({ msg: 'Bad request!' });
  } else {
    next(err);
  }
};
const handleErrors = (err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send({ msg: err.message || 'An error occurred!' });
  } else {
    next(err);
  }
};

const internalErrors = (err, req, res, next) => {
  res.status(500).send({ msg: 'Internal server error!' });
};

module.exports = { notFound, handleErrors, internalErrors, handlePSQLErrors };
