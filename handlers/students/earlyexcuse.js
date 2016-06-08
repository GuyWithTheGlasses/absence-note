var Excuse = require('../../models/earlyexcuses').EarlyExcuse;
var templates = require('../../config/templates');
var messages = require('../../config/messages');
module.exports = {
  get: function(req, res, next) {
    var student = req.user;
    Excuse.find({
      _id: { $in: student.early_excuses }
    }, function(err, excuses) {
      if (err) return next(err);
      res.render(templates.students.earlyexcuse.list, { user: req.user, excuses: excuses }); // Lists all student's excuses
    });
  },
  'id': {
    get: function(req, res, next) { // Returns a template with excuse note
      var student = req.user;
      Excuse.findById(req.params.id, function(err, excuse) {
        if (err) return next(err);
        if (student.OSIS != excuse.OSIS) return next(messages.student.excuse.noMatch);
        return res.render(templates.students.earlyexcuse.view, { user: req.user, excuse: excuse });
      });
    },
    post: function(req, res) {
      var student = req.user;
      Excuse.findById(req.params.id, function(err, excuse) {
        if (err) return next(err);
        if(student.OSIS != excuse.OSIS) return res.json(messages.student.excuse.noMatch);
        excuse.delete(function(err){
          if(err) return res.json(err);
          return res.json(messages.student.excuse.deleted);
        });
      });
    }
  }
};
