'use strict';
const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const { dbConnect } = require('./utils/database/handler');
const port =  process.env.PORT || 3002;

// set the view engine to ejs
app.set('view engine', 'ejs');

// use body-parser as middle-ware to handle post
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Connect and Seed db
if (process.env.environment !== 'test') {
    dbConnect();
}
// routes
app.use('/', require('./routes/profile')());
app.use('/api/celebrity', require('./routes/celebrity')());
app.use('/api/user', require('./routes/user')());

// start server
if (process.env.environment !== 'test') {
    app.listen(port);
}

console.log('Express started. Listening on %s', port);
// The Server can be stopped again with

module.exports = app;