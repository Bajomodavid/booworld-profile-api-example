'use strict';

const express = require('express');
const { getAllProfilesHandler, getProfileHandler, createProfileHandler } = require('./default');
const router = express.Router();

module.exports = function() {
  router.get('/', getAllProfilesHandler);

  router.get('/:id', getProfileHandler);

  router.post('/', createProfileHandler);

  return router;
}

