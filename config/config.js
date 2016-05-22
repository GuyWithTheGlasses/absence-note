var session = require( 'express-session' );
var MongoStore = require( 'connect-mongo' )( session );
var mongoose = require( 'mongoose' );
// var accounts = require('../models/accounts');

module.exports = {
  "db": {
    'url': 'mongodb://localhost:27017/absence'
  },
  'morgan': {
    'format': ':method :status ":url" :response-time[3]ms ||| Size: :res[content-length]octets ',
    'options': {
      "immediate": false,
      "skip": false,
      "stream": process.stdout,
    }
  },
  "bodyParser": {
    "json": {
      "inflate": true,
      "limit": "200kb",
      "strict": false,
      "type": "application/json"
    },
    "urlencoded": {
      "extended": false, //No dictionaries in the url please
      "inflate": true,
      "limit": "100kb",
      "type": "application/x-www-form-urlencoded"
    }
  },
  "session": {
    "name": "sessionid",
    // "proxy":true,
    "resave": false,
    "saveUninitialized": false,
    "secret": process.env.SECRET || "kek",
    "store": new MongoStore( {
      "mongooseConnection": mongoose.connection
    } ),
    "unset": "keep",
    "cookie": {
      "secure": false, // Must be HTTPS
      "path": '/',
      "maxAge": 1 * 24 * 60 * 60, // In seconds
      "httpOnly": false, // coincides with secure option ^
      // "firstPartyOnly":true // Only from server
    }
  },
  "passport": {
    "localRegister": {
      "usernameField": "username",
      "passwordField": "password",
      "passReqToCallback": true
    },
    "localLogin": {
      "usernameField": "username",
      "passwordField": "password",
      "passReqToCallback": true
    }
  },
  'googleAuth': {
    'clientID': process.env.GOOGLE_CLIENT_ID || 'hi',
    'clientSecret': process.env.GOOGLE_CLIENT_SECRET || 'hi',
    'callbackURL': '/auth/google/callback',
    // "passReqToCallback": true
  }
};
