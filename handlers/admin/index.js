var templates = require('../../config/templates');
var Note = require('../../models/notes').Note;
var Excuse = require('../../models/notes').EarlyExcuse;
var Absence = require('../../models/notes').Absence;
var Student = require('../../models/accounts').Student;
var templates = require('../../config/templates');
module.exports = {
  'index': {
    get: function(req, res) {
      Absence.find(function(err, docs) {
        if (err) return next(err);
        else return res.render(templates.admin.index, {
          absences: docs
        });
      });
    }
  },
  'check': {
    loggedIn: function(req, res, next) {
      if (!req.user || req.user.type !== 'Admin') return res.redirect('/');
      else return next();
    },
  },
  'absences': function(req, res, next) {
    Absence.find(function(err, absences) {
      if (err) return next(err);
      return res.render(templates.admin.absences, { user: req.user, absences: absences });
    });
  },
  'students': function(req, res, next) {
    Student.find(function(err, students) {
      if (err) return next(err);
      return res.render(templates.admin.students, { user: req.user, students: students });
    });
  },
  'history': function(req, res, next) {
    Note.find(function(err, notes) {
      if (err) return next(err);
      return res.render(templates.admin.history, { user: req.user, notes: notes });
    });
  },
  'earlyexcuses': function(req, res, next) {
    Excuse.find(function(err, excuses) {
      if (err) return next(err);
      return res.render(templates.admin.earlyexcuse, { user: req.user, excuses: excuses });
    });
  }
};

module.exports.note = require('./note');
