var express = require('express');
var app = express();

var configure = require('./config/index')(app, __dirname);

module.exports.passport = configure.passport;

app.use('/', require('./routes/index'));

module.exports = app;
