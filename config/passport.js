var LocalStrategy = require('passport-local');
var config = require('./config');
var expect = require('expect.js');

var Account = require('../models/accounts').Account;

module.exports = function (passport) {
  passport.serializeUser(function (account, done) {
    return done(null, account.id);
  });
  passport.deserializeUser(function (id, done) {
    Account.findById(id, function (err, account) {
      return done(err, account);
    });
  });

  passport.use('local-register', new LocalStrategy(
    config.passport.localRegister,
    function (req, username, password, done) {
      process.nextTick(function () {
        Account.findOne({
          'username': username
        }, function (err, user) {
          if (err) return done(err);
          if (user && user.username) return done(null, false, 'Username Taken');
          var newAccount = new Account();
          newAccount.username = username;
          if (req.body.email) newAccount.email = req.body.email;
          else return done(null, false, "Missing Email");
          newAccount.generateHash(password, function (hash) {
            newAccount.password = hash;
            console.log(newAccount);
            newAccount.save(function (err) {
              expect(err).to.equal(null);
              return done(null, newAccount);
            });
          });
        });
      });
    }));

  passport.use('local-login', new LocalStrategy(
    config.passport.localLogin,
    function (req, username, password, done) {
      process.nextTick(function () {
        Account.findOne({
          'username': username
        }, function (err, user) {
          if (err || !user) return done(err || "User not found");
          user.authenticate(password, function (match) {
            if (match) return done(null, user);
            else return done(null, false, "Password and Username do not match");
          });
        });
      });
    }));

};
