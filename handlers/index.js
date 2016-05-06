var messages = require('../config/messages');
var passport = require('../app').passport;

module.exports.public = require('./public');
module.exports.accounts = require('./accounts');
module.exports.error = require('./error');
