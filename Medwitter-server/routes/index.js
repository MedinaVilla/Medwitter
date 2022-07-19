const express = require('express');
const users = require('./users');
const tweets = require('./tweets');

module.exports = function(app) {
  app.use(express.json());
  app.use('/api', users);
  app.use('/api', tweets);
}