var session = require( 'express-session' );
var MongoStore = require( 'connect-mongo/es5' )( session );
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
    "resave": true,
    "saveUninitialized": true,
    "secret": process.env.SECRET || "kek",
    "unset": "keep",
    "cookie": {
      "path": '/',
      "maxAge": null, // In seconds
      "httpOnly":true,
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
    },
    'googleAuth': {
      'clientID': process.env.GOOGLE_CLIENT_ID || 'hi',
      'clientSecret': process.env.GOOGLE_CLIENT_SECRET || 'hi',
      'callbackURL': '/auth/google/callback'
        // "passReqToCallback": true
    },
  },
  'nodemailer': {
    'smtp': function() {
      var username = process.env.GMAIL_USERNAME || 'stuyabsencenote@gmail.com';
      var password = process.env.GMAIL_PASSWORD || '\$tuy@bs3nc3n0t3';
      return 'smtps://' + username + ':' + password + '@smtp.gmail.com';
    },
    emailOptions: function( options ) {
      sender = process.env.GMAIL_SENDER || 'Stuy Absence Note';
      username = process.env.GMAIL_USERNAME || 'stuyabsencenote@gmail.com';
      return {
        'from': username,
        'to': options && options.to || 'stuyabsencenote@gmail.com',
        'subject': options && options.subject || 'Do not reply: This is a notification from Stuyvesant\'s absence note system',
        // 'text': options.text || 'test email',
        'html': options && options.html || '<html> <h1> hi </h1> </html>'
      };
    }
  }
};
