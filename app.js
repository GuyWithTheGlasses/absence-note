var express = require('express');
var app = express();

var configure = require('./config/')(app, __dirname);

module.exports.passport = configure.passport;

app.use('/admin', require('./routes/admin'));

app.use('/', require('./routes'));

module.exports = app;
