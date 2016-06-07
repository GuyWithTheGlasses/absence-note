var Absence = require('../../models/absences').Absence;
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;
var templates = require('../../config/templates');
var messages = require('../../config/messages');
module.exports = {
  get: function(req, res, next) {
    var teacher = req.user;
    var pending_absences = teacher.absences.pending;
    var denied_absences = teacher.absences.denied;
    var approved_absences = teacher.absences.approved;
    Absence.find({
      _id: { $in: pending_absences }
    }, function(err, pending_absences) {
      if(err) return next(err);
      Absence.find({
        _id: { $in: denied_absences }
      }, function(err, denied_absences) {
        if(err) return next(err);
        Absence.find({
          _id: { $in: approved_absences }
        }, function(err, approved_absences) {
          if(err) return next(err);
          return res.render(templates.teachers.absences, { user: req.user, pending_absences: pending_absences, denied_absences: denied_absences, approved_absences: approved_absences });
        });
      });
    });
  },
  'id': {
    get: function(req, res) {
      var id = req.params.id;
      var absences = req.user.pending_requests.concat(req.user.approved_absences);
      if (absences.length === 0) return next(messages.teachers.absences.notAllowed);
      Absence.findById(id, function(err, absence) {
        if (err) return next(err);
        if (!absence) return next(messages.teacher.absences.notAllowed);
        return res.render(templates.teachers.absence, { user: req.user, absence: absence });
      });
    },
    pending: function(req, res, next) {
      var teacher = req.user;
      Absence.find({
        _id: {
          $in: teacher.absences.pending.map(function(id) {
            return ObjectId(id);
          })
        }
      }, function(err, pending_absences) {
        if (err) return next(err);
        return res.render(templates.teacher.pending_requests, { user: req.user, pending_absences: pending_absences });
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
