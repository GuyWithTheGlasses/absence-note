var templates = require( '../../config/templates' );
var Absence = require( '../../models/notes' ).Absence;
module.exports = {
  'index': {
    get: function( req, res ) {
      Absence.find( function( err, docs ) {
        if ( err ) return next( err );
        else return res.render( templates.admin.index, {
          absences: docs
        } );
      } );
    }
  },
  'check': {
    loggedIn: function( req, res, next ) {
      if ( !req.user || req.user.type !== 'Admin' ) return res.redirect( '/' );
      else return next();
    },
  },
  'absences': {
    get: function( req, res, next ) {
      res.render( templates.admin.absences, {
        user: req.user
      } );
    }
  },
  'earlyexcuses': {
    get: function( req, res, next ) {
      res.render( templates.admin.earlyexcuses, {
        user: req.user
      } );
    }
  },
  'history': {
    get: function( req, res, next ) {
      res.render( templates.admin.history, {
        user: req.user
      } );
    }
  },
  'students': {
    get: function( req, res, next ) {
      res.render( templates.admin.students, {
        user: req.user
      } );
    }
  },
  'absence': require( './absence' ),
};
