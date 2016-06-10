var Absence = require('../../models/notes').Absence;
var templates = require('../../config/templates');
var messages = require('../../config/messages');
var config = require('../../config/forms');
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
        if (student.OSIS == absence.OSIS)
          return res.render(templates.students.absence.id, { user: req.user, absence: absence });
        else return next(messages.student.absence.noMatch);
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
      console.log('hi');
      var student = req.user;
      // Checks all the parameters and deletes any that aren't supposed to be there
      var formparams = config.absencenote;
      var absence = req.body;
      for (var key in absence) {
        if (!(key in formparams)) {
          delete absence.key;
        }
      }
      // Adds known information to the note
      var note = new Absence(absence);
      note.student = student.google.name;
      note.OSIS = student.OSIS;
      note.homeroom = student.homeroom;
      note.add(function(err) {
        if (err) {
          console.log('wtf');
          return res.send(err);
        }
        return res.send(messages.student.absence.created(note));
      });
    }
  },
};
