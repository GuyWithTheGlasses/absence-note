var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var expect = require('expect.js');

/**
 * Work factor for bcrypt
 * @const {Number}
 */
var SALT_ROUNDS = 10;

var accountSchema = mongoose.Schema({
  local:{
    username:String,
    password:String,
    email:String
  },
});

/**
 * Hashes passwords
 * @param  {String}   password
 * @param  {Function} callback returns the hash
 */
accountSchema.methods.generateHash = function(password, callback){
  bcrypt.hash(password, SALT_ROUNDS, function(err, hash){
    expect(err).to.equal(undefined);
    return callback(hash);
  });
};

/**
 * Checks passwords
 * @param  {String}   password
 * @param  {Function} callback returns whether the check was correct or falsy
 */
accountSchema.methods.authenticate = function(password, callback){
  bcrypt.compare(password, this.local.password, function(err, match){
    expect(err).to.equal(undefined);
    return callback(match);
  });
};

module.exports = mongoose.model('Account', accountSchema);
