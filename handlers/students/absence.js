var Absence = require('../../models/notes').Absence;
var templates = require('../../config/templates');
var messages = require('../../config/messages');
var config = require('../../config/forms');
var transport = require('../../app').transport;
var emails = require('../../emails');
module.exports = {
  get: function(req, res, next) {
    res.render(templates.students.absence.list, { user: req.user });
  },
  /*
██ ██████
██ ██   ██
██ ██   ██
██ ██   ██
██ ██████
*/
  'id': {
    get: function(req, res, next) {
      var student = req.user;
      Absence.findById(req.params.id, function(err, absence) {
        if (err) return next(err);
        if (student.OSIS != absence.OSIS) return next(messages.student.absence.noMatch);
        var formatted = {};
        var excused_date = new Date(absence.excused_date);
        absence.formatted_date = (excused_date.getMonth() + 1) + '/' + excused_date.getDate() + '/' + excused_date.getFullYear();
        for (var key in absence) {
          formatted[key] = absence[key];
        }
        formatted.schedule = [];
        for (var periodkey in absence.schedule) {
          var period = JSON.parse(JSON.stringify(absence.schedule[periodkey]));
          if (period.approved) {
            period.approved = 'check';
          } else {
            period.approved = 'times';
          }
          formatted.schedule.push(period);
        }
        return res.render(templates.students.absence.view, { user: req.user, absence: formatted });
      });
    },
    post: function(req, res) {
      var student = req.user;
      Absence.findById(req.params.id, function(err, absence) {
        if (err) return next(err);
        if (student.OSIS == absence.OSIS) {
          switch (req.body.action) {
            case 'delete':
              absence.delete(function(err) {
                if (err) return next(err);
                return res.send(messages.student.absence.deleted);
              });
              break;
            default:
              return res.send('lol?');
          }
        }
      });
    },
  },
  /*
 ██████ ██████  ███████  █████  ████████ ███████
██      ██   ██ ██      ██   ██    ██    ██
██      ██████  █████   ███████    ██    █████
██      ██   ██ ██      ██   ██    ██    ██
 ██████ ██   ██ ███████ ██   ██    ██    ███████
*/

  'create': {
    get: function(req, res) {
      res.render(templates.students.absence.create, { user: req.user });
    },
    post: function(req, res, next) {
      var student = req.user;
      var data = {};

      var absence = req.body;
      var periods = absence.periods;
      data.schedule = [];
      for (var index in student.teachers) {
        var period = student.teachers[index];
        if (periods[index]) data.schedule.push({
          'Period': period.period,
          'Teacher': period.name,
          'Course Code': period.course_code
        });
      }
      for (var param in absence) data[param] = absence[param];
      // Adds known information to the note
      var note = new Absence(data);
      note.student = student.google.name;
      note.parent = {
        'name': student.parent.name,
        'phone': student.parent.phone,
        'email': student.parent.email,
        'relationship': student.parent.relationship
      };
      note.OSIS = student.OSIS;
      note.homeroom = student.homeroom;
      note.kind = 'Absence';
      note.add(function(err) {
        if (err) {
          return res.send(err);
        }
        for (var teacherkey in student.teachers) {
          teacher = student.teachers[teacherkey];
          if (emails.Teachers[teacher.name]) {
            transport.sendMail({
              subject: 'Absence ' + req.user.google.name + ' Period ' + teacher.period,
              to: emails.Teachers[teacher.name],
              html: req.user.google.name + ' in your period ' + teacher.period + ' class has requested your approval for an absence on ' + absence.excused_date + '<br><a href="stuyabsence.stuycs.org/teacher/note/"' + note._id + '">View Absence Note</a>'
            });
          }
        }
        if(req.user.parent.email){
          transport.sendMail({
            subject: 'Absence ' + req.user.google.name + ' ' + note.date,
            to: req.user.parent.email,
            html: req.user.google.name + ' has submitted an absence excuse for ' + note.date,
          });
        }
        return res.send(messages.student.absence.created(note));
      });
    },
  }
};
