const express = require('express');
const users = require('./users');
const tweets = require('./tweets');
const events = require('./events');
const lists = require('./lists');
const sse = require('./sse');

module.exports = function(app) {
  app.use(express.json());
  app.use('/api', users);
  app.use('/api', tweets);
  app.use('/api', events);
  app.use('/api', lists);
  app.use(sse);
}