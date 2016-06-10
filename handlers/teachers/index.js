var Absence = require( '../../models/notes' ).Absence;
var templates = require( '../../config/templates' );
var mongoose = require( 'mongoose' );
module.exports = {
  'check': {
    loggedIn: function( req, res, next ) {
      if ( !req.isAuthenticated() || req.user.type !== 'Teacher' && req.user.type !== 'Admin' ) return res.redirect( '/login' );
      else return next();
    },
  },
  'index': {
    get: function( req, res, next ) {
      res.render( templates.teachers.index, {
        user: req.user
      } );
    }
  },
  'absences': {
    get: function( req, res, next ) {
      res.render( templates.teachers.absences, {
        user: req.user
      } );
    }
  },
  'pending_requests': {
    get: function( req, res, next ) {
      res.render( templates.teachers.pending_requests, {
        user: req.user
      } );
    }
  },
  'note': require( './note' )
};
