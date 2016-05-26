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
  'check': {
    loggedIn: function(req, res, next) {
      if (!req.user || req.user.type !== 'Admin') return res.redirect('/');
      else return next();
    },
  },
  'absences': require('./absences'),
};
