var Excuse = require('../../models/notes').EarlyExcuse;
var templates = require('../../config/templates');
var messages = require('../../config/messages');
var config = require('../../config/forms');
var emails = require('../../emails');
var transport = require('../../app').transport;
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
        var formatted = {};
        var excused_date = new Date(excuse.excused_date);
        excuse.formatted_date = (excused_date.getMonth() + 1) + '/' + excused_date.getDate() + '/' + excused_date.getFullYear();
        for(var key in excuse){
          formatted[key] = excuse[key];
        }
        formatted.schedule = [];
        for (var periodkey in excuse.schedule){
          var period = JSON.parse(JSON.stringify(excuse.schedule[periodkey]));
          if(period.approved){
            period.approved = 'check';
          }else {
            period.approved = 'times';
          }
          formatted.schedule.push(period);
        }
        return res.render(templates.students.earlyexcuse.view, {
          user: req.user,
          excuse: formatted
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
      var excuse = req.body;
      var periods = excuse.periods;
      var data = {};
      data.schedule = [];
      for (var index in student.teachers) {
        var period = student.teachers[index];
        if (periods[index]) data.schedule.push({
          'Period': period.period,
          'Teacher': period.name,
          'Course Code': period.course_code
        });
      }
      delete excuse.periods;
      delete excuse.schedule;
      for(var key in excuse){
        data[key] = excuse[key];
      }
      var note = new Excuse(data);
      note.student = student.google.name;
      note.parent = {
        'name': student.parent.name,
        'phone': student.parent.phone,
        'email': student.parent.email,
        'relationship': student.parent.relationship
      };
      note.OSIS = student.OSIS;
      note.homeroom = student.homeroom;
      note.kind = 'EarlyExcuse';
      note.add(function(err) {
        if (err) return res.send(err);
        for (var teacherkey in student.teachers) {
          teacher = student.teachers[teacherkey];
          if(emails.Teachers[teacher.name]){
            transport.sendMail({
              subject: 'Early Excuse ' + req.user.google.name + ' Period ' + teacher.period,
              to: emails.Teachers[teacher.name],
              html: req.user.google.name + ' in your period ' + teacher.period + ' class has requested your approval for early leave on ' + note.excused_date + '<br><a href="stuyabsence.stuycs.com/teacher/note/"' + note._id + '">View Early Excuse Note</a>'
            });
          }
        }
        return res.send(messages.student.excuse.created(note));
      });
    }
  }
};
