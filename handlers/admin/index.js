var templates = require('../../config/templates');
var Absence = require('../../models/absences').Absence;
module.exports = {
  'index': {
    get: function(req, res) {
      Absence.find(function(err, docs) {
        if (err) return next(err);
        else return res.render(templates.admin.index, { absences: docs });
      });
    }
  },
  'absences': {
    get: function(req, res, next) {
      Absence.find({}, function(err, absences) {
        if (err) return next(err);
        return res.render(templates.admin.absences, { absences: absences });
      });
    },
    post: function(req, res) {
      res.send('/absences posted');
    },
    'id': {
      get: function(req, res, next) {
        console.log(req.params.id);
        Absence.findById(req.params.id, function(err, absence) {
          if (err) return next(err);
          return res.json(absence);
        });
      },
      post: function(req, res) {
        res.send('/absences/id posted with ' + req.params.id);
      }
    },
  },
  'check': {
    loggedIn: function(req, res, next) {
      if (!req.user || req.user.type !== 'Admin') return res.redirect('/');
      else return next();
    }
  }
};
