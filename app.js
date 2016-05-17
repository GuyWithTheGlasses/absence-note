var express = require('express');
var app = express();

var configure = require('./config/')(app, __dirname);

module.exports.passport = configure.passport;

app.use('/', require('./routes'));

app.use('/admin', require('./routes/admin/'));
module.exports = app;
