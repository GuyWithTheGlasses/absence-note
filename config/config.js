var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var mongoose = require('mongoose');
var accounts = require('../models/accounts');

module.exports = {
  "db":{
    'url':'mongodb://localhost:27017/test'//Replace this with something more suitable
  },
  'morgan':{
    'format':':method :status ":url" :response-time[3]ms ||| Size: :res[content-length]octets ',
    'options':{
      "immediate":false,
      "skip":false,
      "stream":process.stdout,
    }
  },
  "bodyParser":{
    "json":{
      "inflate":true,
      "limit":"200kb",
      "strict":false,
      "type":"application/json"
    },
    "urlencoded":{
      "extended":false,//No dictionaries in the url please
      "inflate":true,
      "limit":"100kb",
      "type":"application/x-www-form-urlencoded"
    }
  },
  "session":{
    "name":"sessionid",
    // "proxy":true,
    "resave":false,
    "saveUninitialized":false,
    "secret":process.env.SECRET || "kek",
    "store": new MongoStore({
      "mongooseConnection":mongoose.connection
    }),
    "unset":"keep",
    "cookie":{
      "secure":false, // Must be HTTPS
      "path":'/',
      "maxAge":1 * 24 * 60 * 60, // In seconds
      "httpOnly":false, // coincides with secure option ^
      // "firstPartyOnly":true // Only from server
    }
  },
  "passport":{
    "localRegister":{
      "usernameField":"username",
      "passwordField":"password",
      "passReqToCallback":true
    },
    "localLogin":{
      "usernameField":"username",
      "passwordField":"password",
      "passReqToCallback":true
    },
    "FacebookAuth":{
      'clientID': process.env.FACEBOOK_APP_ID || '',
      'clientSecret': process.env.FACEBOOK_APP_SECRET || '',
      'callbackURL': "/auth/facebook/callback"
    }
  },
  "nev": function(account){
    return {
      'verificationURL' : '/verifyemail',
      'persistentUserModel' : account,
      'tempUserCollection' : 'smth',

      'transportOptions' : {
	  'service' : 'Gmail',
	  'auth' : {
	      'user' : 'stuy-absence-notes@gmail.com',
	      'pass' : 'make_the_account_first'
	  }
      },

      'verifyMailOptions' : {
	  'from' : 'Do Not Reply <stuy-absence-notes@gmail.com',
	  'subject' : 'Please Confirm Account',
	  'html' : 'Click the following link to confirm your account',
	  'text' : 'Please confirm your accoutn by clicking the following link'
      }

    };
  }
};
