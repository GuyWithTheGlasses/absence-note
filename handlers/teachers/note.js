var Note = require('../../models/notes').Note;
var Absence = require('../../models/notes').Absence;
var Excuse = require('../../models/notes').EarlyExcuse;
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
      req.user.approve(id, function(err){
        if(err) return res.send(err);
        else return res.send({success:true});
      });
    },
    deny: function(req, res) {
      var id = req.params.id;
      req.user.deny(id,function(err){
        if (err) return res.send(err);
        else return res.send({success:true});
      });
      // Note.findById(id, function(err, note) {
      //   if (err) return res.send(err);
      //   note.deny(function(err) {
      //     if (err) return res.send(err);
      //     else return res.send({ success: true });
      //   });
      // });
    },
  },
  absence: function(req, res, next) {
    Absence.findById(req.params.id, function(err, note) {
      if (err) return next(err);
      note = JSON.parse(JSON.stringify(note));
      var excused_date = new Date(note.excused_date);
      note.formatted_date = (excused_date.getMonth() + 1) + '/' + excused_date.getDate() + '/' + excused_date.getFullYear();
      var own_period = note.schedule.find(function(period) {
        return period.Teacher === req.user.google.name;
      });
      note.schedule = note.schedule.map(function(period){
        if(period.approved){
          period.status = 'check';
        }else{
          period.status = 'times';
        }
        return period;
      });
      res.render(templates.teachers.absence.view, {
        note: note,
        own_period: own_period
      });
    });
  },
  earlyexcuse: function(req, res, next) {
    Excuse.findById(req.params.id, function(err, note) {
      if (err) return next(err);
      note = JSON.parse(JSON.stringify(note));
      var excused_date = new Date(note.excused_date);
      note.formatted_date = (excused_date.getMonth() + 1) + '/' + excused_date.getDate() + '/' + excused_date.getFullYear();
      note.schedule = note.schedule.map(function(period){
        if(period.approved){
          period.status = 'check';
        }else{
          period.status = 'times';
        }
        return period;
      });
      res.render(templates.teachers.earlyexcuse.view, {
        note: note,
      });
    });
  }

};
