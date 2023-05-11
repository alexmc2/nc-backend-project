const express = require('express');
const app = express();
const { getAllCategories } = require('./controllers/categories.controllers');
const endpoints = require('./endpoints.json');

app.get('/api', (req, res) => {
  res.status(200).send(endpoints);
});

app.get('/api/categories', getAllCategories);

app.all('/*', (req, res, next) => {
  res.status(404).send({ msg: 'This path doesn"t exist!' });
});

app.use((err, req, res, next) => {
  res.status(500).send('Internal server error!');
});

module.exports = app;