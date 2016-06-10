var Note = require('../../models/notes').Note;
var templates = require('../../config/templates');
var messages = require('../../config/messages');
module.exports = {
  get: function(req, res, next) {
    Note.find({ 'approved': false }, function(err, pending_absences) {
      if (err) return next(err);
      var teacher_ready = pending_absences.map(function(note) {
        var teachers = note.schedule;
        //reduce here
        return note;
      });
      var teacher_unready = pending_absences.map(function(note) {
        var teachers = note.schedule;
        return note;
      });
      Note.find({ 'approved': true }, function(err, approved_notes) {
        if (err) return next(err);
        return res.render(templates.admin.absences, { teacher_ready: teacher_ready, teacher_unready: teacher_unready, approved_notes: approved_notes });
      });
    });
  },
  'id': {
    get: function(req, res, next) {
      Note.findById(req.params.id, function(err, note) {
        if (err) return next(err);
        if (!note) return next(messages.admin.absence.notfound);
        return res.render(templates.admin.absence, { note: note });
      });
    },
    approve: function(req, res) {
      if (req.user && req.user.type == 'Admin' && req.isAuthenticated()) {
        Absence.findAndUpdate({ _id: ObjectId(req.params.id) }, { approved: true }, function(err, absence) {
          if (err) return res.send(err);
          return res.send(messages.admin.absence.approved);
        });
      } else {
        res.send({
          success: false,
          message: 'You are not an administrator',
          redirect: '/logout'
        });
      }
    },
    deny: function(req, res) {

    }
  },
};
