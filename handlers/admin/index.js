var templates = require('../../config/templates');
var Note = require('../../models/notes').Note;
var Excuse = require('../../models/notes').EarlyExcuse;
var Absence = require('../../models/notes').Absence;
var Student = require('../../models/accounts').Student;
var templates = require('../../config/templates');
module.exports = {
  'index': {
    get: function(req, res) {
      Absence.find(function(err, docs) {
        if (err) return next(err);
        else return res.render(templates.admin.index, {
          absences: docs
        });
      });
    }
  },
  'check': {
    loggedIn: function(req, res, next) {
      if (!req.user || req.user.type !== 'Admin') return res.redirect('/');
      else return next();
    },
  },
  'absences': function(req, res, next) {
    Absence.find(function(err, absences) {
      if (err) return next(err);
      absences = absences.map(function(note){
        var excused_date = new Date(note.excused_date);
        note.formatted_date = (excused_date.getMonth() + 1) + '/' + excused_date.getDate() + '/' + excused_date.getFullYear();
        return note;
      });
      return res.render(templates.admin.absences, { user: req.user, absences: absences });
    });
  },
  'students': function(req, res, next) {
    Student.find(function(err, students) {
      if (err) return next(err);
      return res.render(templates.admin.students, { user: req.user, students: students });
    });
  },
  'student':{
    'id':{
      get:function(req, res,next){
        Student.findById(req.params.id, function(err, student){
          if(err) return next(err);
          if(!student) return next();
          return res.render(templates.admin.student.view, {student:student});
        });
      }
    }
  },
  'history': function(req, res, next) {
    Note.find(function(err, notes) {
      if (err) return next(err);
      notes = notes.map(function(note){
        var excused_date = new Date(note.excused_date);
        note.formatted_date = (excused_date.getMonth() + 1) + '/' + excused_date.getDate() + '/' + excused_date.getFullYear();
        return note;
      });
      return res.render(templates.admin.history, { user: req.user, notes: notes });
    });
  },
  'earlyexcuses': function(req, res, next) {
    Excuse.find(function(err, excuses) {
      if (err) return next(err);
      excuses = excuses.map(function(note){
        var excused_date = new Date(note.excused_date);
        note.formatted_date = (excused_date.getMonth() + 1) + '/' + excused_date.getDate() + '/' + excused_date.getFullYear();
        return note;
      });
      return res.render(templates.admin.earlyexcuses, { user: req.user, excuses: excuses });
    });
  }
};

module.exports.note = require('./note');
