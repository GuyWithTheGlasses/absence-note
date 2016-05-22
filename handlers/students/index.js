var templates = require('../../config/templates');
module.exports = {
  'check': {
    'loggedIn':function(req,res,next){
      console.log('hi');
      if(req.isAuthenticated()) return next();
      else return res.redirect('/login');
    }
  },
  'index': {
    'get': function(req, res, next) {
      res.render(templates.students.index, {user:req.user});
    }
  },
  'absencenote':{
    get:function(req,res, next){
      if(!req.user) return next('Missing User');
      res.render(templates.students.createabsencenote, {user:req.user});
    },
    post: function(req, res){
      var student = req.user.google.name;
      var note = {
        student: student,
        OSIS:req.body.OSIS,
        homeroom:req.user.homeroom,
        excused:req.body.excused || null,
        corrections:req.body.corrections || null,
        submission_date: req.body.submission_date,
        excused_date: req.body.excused_date,
        excuse:String
      };
      res.render(templates.students.viewabsencenote, {user:req.user, note:note});
    }
  }
};
