const app = require('../app');

const notFound = (req, res, next) => {
  res.status(404).send({ msg: 'Not found!' });
};

const handleErrors = (err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send({ msg: err.message || 'An error occurred!' });
  } else if (err.code === '22P02') {
    res.status(400).send({
      msg: 'Bad request!',
    });
  } else {
    next(err);
  }
};

const internalErrors = (err, req, res, next) => {
  res.status(500).send({ msg: 'Internal server error!' });
};

module.exports = { notFound, handleErrors, internalErrors };
