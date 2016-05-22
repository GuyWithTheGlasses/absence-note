var templates = require('../../config/templates');
var Absence = require('../../models/absences').Absence;
module.exports = {
  'check': {
    'loggedIn': function(req, res, next) {
      console.log('hi');
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
      if (!req.user) return next('Missing User');
      res.render(templates.students.createabsencenote, { user: req.user });
    },
    post: function(req, res) {
      var student = req.user.google.name;
      var note = new Absence();
      note.student = student;
      note.OSIS = req.body.OSIS;
      note.homeroom = req.user.homeroom;
      note.excused = req.body.excused || null;
      note.corrections = req.body.corrections || null;
      note.submission_date = req.body.submission_date;
      note.excused_date = req.body.excused_date;
      note.excuse = req.body.excuse;
      note.save(function(err){
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
