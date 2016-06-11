var express = require( 'express' );
var Student = require( '../../models/accounts' ).Student;

var templates = require( '../../config/templates' );
var messages = require( '../../config/messages' );

module.exports = {
  get: function( req, res, next ) { // View profile and edit
    res.render( templates.students.profile, {
      user: req.user
    } );
  },
  post: function( req, res ) { // Receives updated profile
    var studentForm = req.body;
    console.log(studentForm);
    var updated = {$set:{}};
    for ( var field in studentForm ) {
      if(field.includes('-')) {
        newfield = field.split('-');
        updated.$set[newfield[0]] = updated.$set[newfield[0]] || {};
        updated.$set[newfield[0]][newfield[1]] = studentForm[field];
      }else{
        updated.$set[field] = studentForm[field];
      }
    }
    console.log(updated);
    Student.findByIdAndUpdate( req.user._id, updated, {upsert:true}, function(err, doc){
      if(err) return res.send(err);
      else return res.json({success:true});
    });
  },
  'ajax': {
    get: function( req, res ) {
      // Middleware to provide frontend js with a way to access their user
      res.json( req.user );
    }
  },
  'finished':function(req, res, next){
    var student = req.user;
    if(student.OSIS && student.homeroom && student.phone && student.parent && student.parent.name && student.parent.relationship && student.parent.phone && student.parent.email) return next();
    else return res.redirect('/student/profile');
  }
};
