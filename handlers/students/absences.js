// var Absence = require('../../models/absences').Absence;
var Absence = {};
var templates = require('../../config/templates');
var messages = require('../../config/messages');
module.exports = {
  get: function(req, res, next) {
    res.render(templates.students.absences, { user: req.user });
  },
  'id': {
    get: function(req, res, next) {
      var student = req.user;
      Absence.findById(req.params.id, function(err, absence) {
        if (err) return next(err);
        if (student.OSIS == absence.OSIS) return res.render(templates.students.absence.id, { user: req.user, absence: absence });
        else return next(messages.student.absence.noMatch);
      });
    }
  },
  'create': {
    get: function(req, res) {
      res.render(templates.students.absence.create, { user: req.user });
    },
    post: function(req, res) {
      var student = req.user;
      // var note = new Absence(req.body);
      var formparams = config.absencenote.params;
      var absence = req.body;
      for (var key in form) {
        if (!(form.key in formparams)) {
          delete form.key;
        }
      }
      absence.student = student.google.name;
      note.OSIS = student.OSIS;
      note.homeroom = student.homeroom;
      note.schedule = req.body.schedule;
      note.add(function(err) {
        if (err) return res.send(err);
        return res.send({
          'success': true,
          'note': note
        });
      });
    }
  },
};

module.exports.absence = require('./absences');
