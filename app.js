var express = require('express');
var app = express();

var configure = require('./config/')(app, __dirname);

module.exports.passport = configure.passport;
module.exports.transport = configure.transport;

app.use('/student', require('./routes/students'));
app.use('/teacher', require('./routes/teachers'));
app.use('/admin', require('./routes/admin'));
app.use('/', require('./routes'));

app.use(require('./routes/error'));

module.exports = app;
