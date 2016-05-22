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

          // Parses google's email lists into something useable
          var profileemails = [];
          for (var emailkey in profile.emails) {
            profileemails.push(profile.emails[emailkey].value);
          }

          // Defines account based on email lists
          var newAccount;
          if (intersect(profileemails, emails.Administrator).length !== 0) newAccount = new accounts.Account();
          else if (intersect(profileemails, emails.Teacher).length !== 0) newAccount = new accounts.Teacher();
          else newAccount = new accounts.Student();

          // To make sure I get only what I want
          newAccount.google.id = profile.id;
          newAccount.google.token = token;
          newAccount.google.name = profile.displayName;
          newAccount.google.emails = profile.emails;

          //Saves to db
          newAccount.save(function(err) {
            if (err) return done(err);
            return done(null, newAccount);
          });
        });
      });
    }
  ));
};
