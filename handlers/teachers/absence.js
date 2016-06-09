var Absence = require('../../models/notes').Note;
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;
var templates = require('../../config/templates');
var messages = require('../../config/messages');
module.exports = {
  'id': {
    get: function(req, res) {
      var id = req.params.id;
      var notes = req.user.notes;
      if (notes.length === 0) return next(messages.teachers.notes.notAllowed);
      Absence.findById(id, function(err, absence) {
        if (err) return next(err);
        if (!absence) return next(messages.teacher.notes.notAllowed);
        return res.render(templates.teachers.absence, { user: req.user, absence: absence });
      });
    },
    approve: function(req, res) {
      var id = req.params.id;
      Absence.findById(id, function(err, absence) {
        if (err) return res.send(err);
        absence.approve(function(err) {
          if (err) return res.send(err);
          else return res.send(messages.teacher.absences.approved);
        });
      });
    },
    deny: function(req, res) {
      var id = req.params.id;
      Absence.findById(id, function(err, absence) {
        if (err) return res.send(err);
        absence.deny(function(err) {
          if (err) return res.send(err);
          else return res.send(messages.teacher.absences.denied);
        });
      });
    }
  }
};
