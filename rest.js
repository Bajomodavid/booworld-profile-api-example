const request = require('./request');

exports.getAPI = user => request('http://localhost:3002/')