'use strict';

const express = require('express');
const { createUserHandler, getAllUsersHandler } = require('./default');
const router = express.Router();

module.exports = function() {
    router.post('/', createUserHandler);

    router.get('/', getAllUsersHandler);

    return router;
  }
  
  