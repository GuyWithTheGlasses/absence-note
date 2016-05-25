var Absence = require('../../models/absences').Absence;
var templates = require('../../config/templates');
var mongoose = require('mongoose');
module.exports = {
  'check': {
    loggedIn: function(req, res, next) {
      if (!req.isAuthenticated() || req.user.type !== 'Teacher' && req.user.type !== 'Admin') return res.redirect('/login');
      else return next();
    },
  },
  'index': {
    get: function(req, res, next) {
      res.render(templates.teachers.index, { user: req.user });
    }
  },
  'absences': {
    get: function(req, res, next) {
      var pendingAbsences = req.user.pending_requests;
      var approvedAbsences = req.user.approved_absences;
      Absence.find({
        _id: {
          $in: pendingAbsences.map(function(id) {
            return mongoose.Types.ObjectId(id);
          })
        }
      }, function(err, absences) {
        if (err) return next(err);
        pendingAbsences = absences;
        Absence.find({
          _id: {
            $in: approvedAbsences.map(function(id) {
              return mongoose.Types.ObjectId(id);
            })
          }

        }, function(err, absences) {
          approvedAbsences = absences;
          if (err) return next(err);
          res.render(templates.teachers.absences, { pending: pendingAbsences, approved: approvedAbsences });
        });
      });
    },
    id: {
      get: function(req, res, next) {
        Absence.findById(req.params.id, function(err, absence) {
          if (err) return res.send('Incorrect id ' + req.params.id);
          else return res.render(templates.teacher.absence, { absence: absence });
        });
      }
    }
  }
};
