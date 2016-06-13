var Excuse = require('../../models/notes').EarlyExcuse;
var templates = require('../../config/templates');
var messages = require('../../config/messages');
var config = require('../../config/forms');
module.exports = {
  get: function(req, res, next) {
    var student = req.user;
    Excuse.find({
      _id: {
        $in: student.early_excuses
      }
    }, function(err, excuses) {
      if (err) return next(err);
      res.render(templates.students.earlyexcuse.list, {
        user: req.user,
        excuses: excuses
      }); // Lists all student's excuses
    });
  },
  'id': {
    get: function(req, res, next) { // Returns a template with excuse note
      var student = req.user;
      Excuse.findById(req.params.id, function(err, excuse) {
        if (err) return next(err);
        if (student.OSIS != excuse.OSIS) return next(messages.student.excuse.noMatch);
        return res.render(templates.students.earlyexcuse.view, {
          user: req.user,
          excuse: excuse
        });
      });
    },
    post: function(req, res) {
      var student = req.user;
      Excuse.findById(req.params.id, function(err, excuse) {
        if (err) return res.json(err);
        if (student.OSIS != excuse.OSIS) return res.json(messages.student.excuse.noMatch);
        excuse.delete(function(err) {
          if (err) return res.json(err);
          return res.json(messages.student.excuse.deleted);
        });
      });
    }
  },
  'create': {
    get: function(req, res) {
      res.render(templates.students.earlyexcuse.create, {
        user: req.user
      });
    },
    post: function(req, res) {
      var student = req.user;
      var formparams = config.earlyexcusenote;
      var excuse = req.body;
      for (var key in excuse) {
        if (!(key in formparams))
          delete excuse.key;
      }
      var note = new Excuse(excuse);
      note.student = student.google.name;
      note.OSIS = student.OSIS;
      note.homeroom = student.homeroom;
      note.kind = 'EarlyExcuse';
      note.add(function(err) {
        if (err)
          return res.send(err);
        return res.send(messages.student.excuse.created(note));
      });
    }
  }
};
