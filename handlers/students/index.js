var templates = require( '../../config/templates' );
var Absence = require( '../../models/absences' ).Absence;
var config = require( '../../config/forms' );

var intersect = require( 'intersect' );
// var note = new Absence();
// note.student = 'Leon Chou';
// note.OSIS = 203766068;
// note.excused = 'ABSENCE';
// note.corrections = null;
// note.submission_date = "05/21";
// note.excused_date = "05/14";
// note.excuse = "Went to dentist";
// note.save( function( err ) {
//   if ( err ) return console.log( err );
//   return;
// } );

module.exports = {
  'check': {
    'loggedIn': function( req, res, next ) {
      if ( req.isAuthenticated() ) return next();
      else return res.redirect( '/login' );
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
  'earlyexcuse': {
    'id': {
      get: function( req, res, next ) {
        res.render( templates.students.earlyexcusenote );
      }
    },
    get: function( req, res, next ) {
      res.render( templates.students.earlyexcuseform );
    }
  },
  'profile': {
    get: function( req, res, next ) {
      res.render( templates.students.profile, {
        user: req.user
      } );
    },
  },
  'history': {
    get: function( req, res, next ) {
      res.render( templates.students.history, {
        user: req.user
      } );
    }
  }
};

module.exports.absences = require( './absences' );
