var templates = require('../../config/templates');
var Note = require('../../models/notes').Note;
var Absence = require('../../models/notes').Absence;
var Excuse = require('../../models/notes').EarlyExcuse;
var config = require('../../config/forms');

module.exports = {
  'check': {
    'loggedIn': function(req, res, next) {
      if (req.isAuthenticated())
        return next();
      else
        return res.redirect('/login');
      next();
    }
  },
  'index': {
    'get': function(req, res, next) {
      res.render(templates.students.index, {
        user: req.user
      });
    }
  },
  'history': {
    get: function(req, res, next) {
      Note.find({
        _id: { $in: req.user.notes }
      }, function(err, notes) {
        res.render(templates.students.history, {
          user: req.user,
          history: notes
        });
      });
    }
  },
  'names': {
    get: function(req, res, next) {
      return res.json(Object.keys(require('../../emails').Teachers));
    }
  }
};

module.exports.absence = require('./absence');
module.exports.profile = require('./profile');
module.exports.earlyexcuse = require('./earlyexcuse');
