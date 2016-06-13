var Note = require('../../models/notes').Note;
var templates = require('../../config/templates');
var messages = require('../../config/messages');
var ObjectId = require('mongoose').Schema.Types.ObjectId;
var Absence = require('../../models/notes').Absence;
var Excuse = require('../../models/notes').EarlyExcuse;
module.exports = {
  get: function(req, res, next) {
    Note.find({ 'approved': false }, function(err, pending_notes) {
      if (err) return next(err);
      var teacher_ready = pending_notes.map(function(note) {
        var teachers = note.schedule;
        //reduce here
        return note;
      });
      var teacher_unready = pending_notes.map(function(note) {
        var teachers = note.schedule;
        return note;
      });
      Note.find({ 'approved': true }, function(err, approved_notes) {
        if (err) return next(err);
        return res.render(templates.admin.notes, { teacher_ready: teacher_ready, teacher_unready: teacher_unready, approved_notes: approved_notes });
      });
    });
  },
  'id': {
    get: function(req, res, next) {
      Note.findById(req.params.id, function(err, note) {
        if (err) return next(err);
        if (!note) return next(messages.admin.note.notfound);
        return res.render(templates.admin.note, { note: note });
      });
    },
    approve: function(req, res) {
      if (req.user && req.user.type == 'Admin' && req.isAuthenticated()) {
        Note.findById(req.params.id, function(err, note) {
          note.approve(function(err) {
            if (err) return res.send(err);
            return res.send(messages.admin.note.approved);
          });
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
      Note.findById(req.params.id, function(err, note) {
        if (err) return res.send(err);
        if (!note) return res.send(messages.admin.note.notfound);
        note.deny(function(err) {
          if (err) return res.send(err);
          else res.send(messages.admin.note.denied);
        });
      });
    }
  },
  absence: {
    id: {
      get: function(req, res, next) {
        Absence.findById(req.params.id, function(err, absence) {
          if (err) return next(err);
          if (!absence) return next(messages.admin.note.notfound);
          var excused_date = new Date(absence.excused_date);
          absence.formatted_date = (excused_date.getMonth() + 1) + '/' + excused_date.getDate() + '/' + excused_date.getFullYear();
          return res.render(templates.admin.absence.pending, { user: req.user, absence: absence });
        });
      }
    }
  },
  earlyexcuse: {
    id: {
      get: function(req, res, next) {
        Excuse.findById(req.params.id, function(err, excuse) {
          if (err) return next(err);
          if (!excuse) return next(messages.admin.note.notfound);
          var excused_date = new Date(excuse.excused_date);
          excuse.formatted_date = (excused_date.getMonth() + 1) + '/' + excused_date.getDate() + '/' + excused_date.getFullYear();
          return res.render(templates.admin.earlyexcuse.pending, { user: req.user, excuse:excuse});
        });
      }
    }
  }
};
