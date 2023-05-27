const express = require('express');
const apiRouter = require('./routes/api.router');
const endpoints = require('./endpoints.json');
const app = express();

const {
  notFound,
  handlePSQLErrors,
  handleErrors,
  internalErrors,
} = require('./controllers/errors.controllers');

app.use(express.json());

app.get('/api', (req, res) => {
  res.status(200).send(endpoints);
});

app.use('/api', apiRouter);
app.use(notFound);
app.use(handlePSQLErrors);
app.use(handleErrors);
app.use(internalErrors);

module.exports = app;
