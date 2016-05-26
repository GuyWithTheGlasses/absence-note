var Absence = require('../../models/absences').Absence;
var templates = require('../../config/templates');
var messages = require('../../config/messages');
module.exports = {
  get: function(req, res, next) {
    Absence.find({ 'approved': false }, function(err, pending_absences) {
      if (err) return next(err);
      var teacher_ready = pending_absences.map(function(absence) {
        var teachers = absence.schedule;
        //reduce here
        return absence;
      });
      var teacher_unready = pending_absences.map(function(absence) {
        var teachers = absence.schedule;
        return absence;
      });
      Absence.find({ 'approved': true }, function(err, approved_absences) {
        if (err) return next(err);
        return res.render(templates.admin.absences, { teacher_ready: teacher_ready, teacher_unready: teacher_unready, approved_absences: approved_absences });
      });
    });
  },
  'id': {
    get: function(req, res, next) {
      Absence.findById(req.params.id, function(err, absence) {
        if (err) return next(err);
        if (!absence) return next(messages.admin.absence.notfound);
        return res.render(templates.admin.absence, { absence: absence });
      });
    },
    post: function(req, res) {
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
    }
  },
};
