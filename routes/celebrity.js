'use strict';

const express = require('express');
const { getAllCelebrities, getCelebrity, voteCelebrity, getCelebrityVotes, likeOrUnlikeComment } = require('../utils/actions/celebrity_actions');
const { getAllCelebritiesHandler, likeOrUnlikeCommentHandler, getCelebrityHandler, getCelebrityVotesHandler, voteCelebrityHandler } = require('./default');
const router = express.Router();




module.exports = function() {
    router.get('/', getAllCelebritiesHandler);

    router.get('/:id', getCelebrityHandler);

    router.post('/comment/:id/:user', voteCelebrityHandler);

    router.get('/votes/:id', getCelebrityVotesHandler);

    router.put('/votes/like', likeOrUnlikeCommentHandler);

    return router;
  }
  
  