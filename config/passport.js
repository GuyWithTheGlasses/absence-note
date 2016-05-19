var LocalStrategy = require('passport-local');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

var config = require('./config');
var expect = require('expect.js');

var Account = require('../models/accounts').Account;

module.exports = function(passport) {
  passport.serializeUser(function(account, done) {
    return done(null, account.id);
  });
  passport.deserializeUser(function(id, done) {
    Account.findById(id, function(err, account) {
      return done(err, account);
    });
  });

  passport.use(new GoogleStrategy(config.passport.googleAuth,
  function(token, refreshToken, profile, done){
    process.nextTick(function(){
      Account.findOne({'google.id':profile.id}, function(err, account){
        if(err) return done(err);
        if(account) return done(account);
        var newAccount = new Account();
        newAccount.google.id = profile.id;
        newAccount.google.token = token;
        newAccount.google.name = profile.displayName;
        newAccount.google.emails = profile.emails;
        newAccount.register(function(err){
          if(err) return done(err);
          return done(null, newAccount);
        });
      });
    });
  }));

  passport.use('local-register', new LocalStrategy(
    config.passport.localRegister,
    function(req, username, password, done) {// callback passed to constructor
      process.nextTick(function() {
        Account.findOne({
          'username': username
        }, function(err, user) {
          if (err) return done(err);
          if (user && user.username) return done(null, false, 'Username Taken');
          if (user && user.email) return done(null, false, 'Email already in use');
          var newAccount = new Account();
          newAccount.username = username;
          if (req.body.email) newAccount.email = req.body.email;
          else return done(null, false, "Missing Email");
          newAccount.generateHash(password, function(hash) {
            newAccount.password = hash;
            newAccount.register(function(err) {
              expect(err).to.equal(null);
              return done(null, newAccount);
            });
          });
        });
      });
    }));

  passport.use('local-login', new LocalStrategy(
    config.passport.localLogin,
    function(req, username, password, done) {
      process.nextTick(function() {
        Account.findOne({
          'username': username
        }, function(err, user) {
          if (err || !user) return done(err || "User not found");
          user.authenticate(password, function(match) {
            if (match) return done(null, user);
            else return done(null, false, "Password and Username do not match");
          });
        });
      });
    }));

};
