var config = require('./config');
var path = require('path');

module.exports = function(app, dirname) {

  var mongoose = require('mongoose');
  mongoose.connect(config.db.url);

  var morgan = require('morgan');
  app.use(morgan(config.morgan.format, config.morgan.options));

  var session = require('express-session');
  app.use(session(config.session));

  var hogan = require('hogan-express');
  app.set('views', path.join(dirname, 'views'));
  app.set('view engine', 'html');
  app.set('layout', 'layout');
  app.enable('view cache');
  app.engine('html', hogan);

  var bodyParser = require('body-parser');
  app.use(bodyParser.json(config.bodyParser.json));
  app.use(bodyParser.urlencoded(config.bodyParser.urlencoded));

  var cookieParser = require('cookie-parser');
  app.use(cookieParser(config.session.secret, config.session.cookie));

  var express = require('express');
  app.use(express.static(path.join(dirname, 'public')));

  var passport = require('passport');
  require('./passport')(passport);
  app.use(passport.initialize());
  app.use(passport.session());

  var nodemailer = require('nodemailer');
  var transporter = nodemailer.createTransport(config.nodemailer.smtp());
  var transport = {
    emailOptions: config.nodemailer.emailOptions,
    sendMail: function(options, callback) {
      emailoptions = this.emailOptions(options);
      console.log(emailoptions);
      // transporter.sendMail(emailoptions, callback);
    }
  };

  return {
    passport: passport,
    transport: transport
  };
};
