var Note = require('../../models/notes').Note;
var Absence = require('../../models/notes').Absence;
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
      res.render(templates.teachers.index, {
        user: req.user
      });
    }
  },
  'history': {
    get: function(req, res, next) {
      Note.find(function(err, notes) {
        if (err) return next(err);
        return res.render(templates.teachers.history, {
          user: req.user,
          notes: notes
        });
      });
    }
  },
  'pending_requests': {
    get: function(req, res, next) {
      Note.find({
        _id: {
          $in: req.user.notes.pending
        }
      }, function(err, pending_notes) {
        res.render(templates.teachers.pending_requests, {
          user: req.user,
          pending_reqs: pending_notes
        });
      });
    }
  },
  'note': require('./note')
};
