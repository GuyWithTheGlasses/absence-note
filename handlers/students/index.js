var templates = require( '../../config/templates' );
var Note = require('../../models/notes').Note;
var Absence = require( '../../models/notes' ).Absence;
var Excuse = require( '../../models/notes' ).EarlyExcuse;
var config = require( '../../config/forms' );

var intersect = require( 'intersect' );

var fs = require( 'fs' );
var Teachers = "";
data = fs.readFileSync( 'emails_facstaff_20160520.csv', 'utf8' );
data = data.split( '\n' );
for ( var lineindex in data ) {
  var line = data[ lineindex ].trim().split( ',' );
  Teachers += ( line[ 2 ].trim() + ', ' + line[ 1 ].trim() ) + ";";
}

module.exports = {
  'check': {
    'loggedIn': function( req, res, next ) {
      if ( req.isAuthenticated() )
        return next();
      else
        return res.redirect( '/login' );
      next();
    }
  },
  'index': {
    'get': function( req, res, next ) {
      res.render( templates.students.index, {
        user: req.user
      } );
    }
  },
  'history': {
    get: function( req, res, next ) {
      res.render( templates.students.history, {
        user: req.user,
        history: Note.find({'OSIS': user.OSIS},function(err,notes){
          if (err)
            console.log(err);
          return notes;
        })
      } );
    }
  },
  'email': {
    get: function( req, res, next ) {
      res.send( Teachers );
    }
  }
};

module.exports.absence = require( './absence' );
module.exports.profile = require( './profile' );
module.exports.earlyexcuse = require( './earlyexcuse' );
