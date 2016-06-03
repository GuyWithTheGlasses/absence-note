var Absence = require('../../models/absences').Absence;
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;
var templates = require('../../config/templates');
var messages = require('../../config/messages');
module.exports = {
  get: function(req, res, next) {
    var pendingRequests = req.user.pending_requests;
    var approvedAbsences = req.user.approved_absences;
    Absence.find({
      _id: {
        $in: pendingRequests.map(function(id) {
          return ObjectId(id);
        })
      }
    }, function(err, pendingRequests) {
      if (err) return next(err);
      Absence.find({
        _id: {
          $in: approvedAbsences.map(function(id) {
            return ObjectId(id);
          })
        }
      }, function(err, approvedAbsences) {
        if (err) return next(err);
        return res.render(templates.teachers.absences, { pendingRequests: pendingRequests, approvedAbsences: approvedAbsences });
      });
    });
  },
  post: function(req, res) {
    var pendingRequests = req.user.pending_requests;
    var approvedAbsences = req.user.approved_absences;
    Absence.find({
      _id: {
        $in: pendingRequests.map(function(id) {
          return ObjectId(id);
        })
      }
    }, function(err, pendingRequests) {
      if (err) return res.json(err);
      Absence.find({
        _id: {
          $in: approvedAbsences.map(function(id) {
            return ObjectId(id);
          })
        }
      }, function(err, approvedAbsences) {
        if (err) return res.json(err);
        return res.json({
          success: true,
          approvedAbsences: approvedAbsences,
          pendingRequests: pendingRequests
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
      Absence.findById(id, function(err, absence){
        if(err) return res.send(err);
        absence.deny(function(err){
          if(err) return res.send(err);
          else return res.send(messages.teacher.absences.denied);
        });
      });
    }
  }
};
