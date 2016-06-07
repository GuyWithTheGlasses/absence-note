var templates = require( '../../config/templates' );
var Absence = require( '../../models/absences' ).Absence;
var config = require( '../../config/forms' );

var intersect = require( 'intersect' );

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
  // 'earlyexcuse': {
  //   'id': {
  //     get: function( req, res, next ) {
  //       res.render( templates.students.earlyexcusenote );
  //     }
  //   },
  //   get: function( req, res, next ) {
  //     res.render( templates.students.earlyexcuseform );
  //   }
  // },
  // 'profile':{
  //   get:function(req,res,next){
  //     res.render(templates.students.profile, {user:req.user});
  //   },
  // }
  'history': {
    get: function( req, res, next ) {
      res.render( templates.students.history, {
        user: req.user
      } );
    }
  }
};

module.exports.absence = require('./absence');
module.exports.profile = require('./profile');
