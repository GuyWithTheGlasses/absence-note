var templates = require('../../config/templates');
var Absence = require('../../models/absences').Absence;
var config = require('../../config/forms');

var intersect = require('intersect');
// var note = new Absence();
// note.student = 'Leon Chou';
// note.OSIS = 203766068;
// note.excused = 'ABSENCE';
// note.corrections = null;
// note.submission_date = "05/21";
// note.excused_date  = "05/14";
// note.excuse = "Went to dentist";
// note.save(function(err){
//   if(err) return console.log(err);
//   return;
// });

module.exports = {
  'check': {
    'loggedIn': function(req, res, next) {
      if (req.isAuthenticated()) return next();
      else return res.redirect('/login');
    }
  },
  'index': {
    'get': function(req, res, next) {
      res.render(templates.students.index, { user: req.user });
    }
  },
  'absencenote': {
    get: function(req, res, next) {
      if(!req.user) return res.redirect('/login');
      if(!req.user.OSIS || !req.user.homeroom || !req.user.parents)
      res.render(templates.students.createabsencenote, { user: req.user });
    },
    post: function(req, res) {
      var student = req.user;
      // var note = new Absence(req.body);
      var formparams = config.absencenote.params;
      var absence = req.body;
      for(var key in form){
        if( !(form.key in formparams) ){
          delete form.key;
        }
      }
      absence.student = student.google.name;
      note.OSIS = student.OSIS;
      note.homeroom = student.homeroom;
      note.schedule = req.body.schedule;
      note.add(function(err){
        if(err) return res.send(err);
        return res.send({
          'success':true,
          'note':note
        });
      });
    },
    'id':{
      get:function(req,res,next){},
      post:function(req,res,next){}
    }
  }
};
