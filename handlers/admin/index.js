var templates = require('../../config/templates');
var Absence = require('../../models/absences').Absence;
module.exports = {
  'index':{
    get:function(req,res){
      Absence.find(function(err, docs){
        if(err) return next(err);
        else return res.render(templates.index, {absences:docs});
      });
    }
  },
  'absences': {
    get: function(req, res) {
      res.render(templates.admin.absences);
    },
    post: function(req, res) {
      res.send('/absences posted');
    },
    'id': {
      get: function(req, res) {
        res.send('/absences/id posted with ' + req.params.id);
      },
      post: function(req, res) {
        res.send('/absences/id posted with ' + req.params.id);
      }
    },
  },
  'check': function(req, res, next) {
    if (!req.user || req.user.type !== 'Admin') return res.redirect('/');
    else return next();
  }
};
