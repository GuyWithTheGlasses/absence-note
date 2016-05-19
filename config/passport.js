var LocalStrategy = require('passport-local');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

var config = require('./config');
var emails = require('../emails');
var accounts = require('../models/accounts');

var expect = require('expect.js');
var intersect = require('intersect');


module.exports = function(passport) {
  passport.serializeUser(function(account, done) {
    return done(null, account.id);
  });
  passport.deserializeUser(function(id, done) {
    accounts.Account.findById(id, function(err, account) {
      return done(err, account);
    });
  });

  passport.use('google', new GoogleStrategy(config.passport.googleAuth,
    function(token, refreshToken, profile, done) {
      console.log('hlee');
      process.nextTick(function() {
        accounts.Account.findOne({ 'google.id': profile.id }, function(err, account) {
          if (err) return done(err);
          if (account) return done(null, account);
          var newAccount;
          if (intersect(profile.emails, emails.Administrator).length !== 0) newAccount = new accounts.Account();
          else if (intersect(profile.emails, emails.Teacher).length !== 0) newAccount = new accounts.Teacher();
          else newAccount = new accounts.Student();
          newAccount.google.id = profile.id;
          newAccount.google.token = token;
          newAccount.google.name = profile.displayName;
          console.log(profile.emails);
          newAccount.google.emails = profile.emails;
          newAccount.save(function(err) {
            if (err) return done(err);
            return done(null, newAccount);
          });
        });
      });
    }
  ));
};
