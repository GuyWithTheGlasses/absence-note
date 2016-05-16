var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var expect = require('expect.js');

/**
 * Work factor for bcrypt
 * @const {Number}
 */
var SALT_ROUNDS = 10;

var studentSchema = mongoose.Schema({
  username: String,
  password: String,
  email: String,
  OSIS: Number,
  homeroom: String,
  parents: [{
    name: String,
    phone: String
  }],
  absences: [{
    date: String,
    excuse: String,
  }]
});

module.exports = mongoose.model('Account', accountSchema);
