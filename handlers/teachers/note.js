var Note = require('../../models/notes').Note;
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
      Note.findById(id, function(err, note) {
        if (err) return next(err);
        if (!note) return next(messages.teacher.notes.notAllowed);
        return res.render(templates.teachers.absence, { user: req.user, absence: note });
      });
    },
    approve: function(req, res) {
      var id = req.params.id;
      Note.findById(id, function(err, note) {
        if (err) return res.send(err);
        note.approve(function(err) {
          if (err) return res.send(err);
          else return res.send(messages.teacher.absences.approved);
        });
      });
    },
    deny: function(req, res) {
      var id = req.params.id;
      Note.findById(id, function(err, note) {
        if (err) return res.send(err);
        note.deny(function(err) {
          if (err) return res.send(err);
          else return res.send(messages.teacher.absences.denied);
        });
      });
    }
  }
};
