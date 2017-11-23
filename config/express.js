const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const logger = require('morgan');
const layouts = require('express-ejs-layouts');
const config = require('./config.js');
const mongoose = require('mongoose');
const path = require('path');

module.exports = function(app) {

  mongoose.connect(config.db);

  app.set('views', config.rootPath + 'views');
  app.set('view engine', 'ejs');
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: false
  }));
  app.use(cookieParser());
  app.use('/dist/jquery', express.static(path.join(__dirname, '../node_modules/jquery/dist')));
  app.use('/dist/bootstrap', express.static(path.join(__dirname, '../node_modules/bootstrap/dist')));
  app.use('/dist/css', express.static(path.join(__dirname, '../node_modules/materialize-css')));
  app.use(express.static(config.rootPath + 'public'));
  app.use(layouts);
  app.use(session({
    secret: 'The Running is the Secret',
    resave: false,
    saveUninitialized: true,
  }));
  app.use(passport.initialize());
  app.use(passport.session());

  app.use(function(req, res, next) {
    res.locals.user = req.user;
    res.locals.event = req.event;
    next();
  });
};
