const express = require('express');
const morgan = require('morgan');
const passport = require('passport');
const cors = require('cors');

const middleware = [
  morgan('dev'),
  express.urlencoded({ extended: true }),
  express.json(),
  cors(),
];

module.exports = (app) => {
  middleware.forEach((item) => {
    app.use(item);
  });

  app.use(passport.initialize());

  require('./auth/passport')();
};
