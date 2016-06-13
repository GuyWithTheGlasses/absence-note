var templates = require('../../config/templates');
var Note = require('../../models/notes').Note;
var Absence = require('../../models/notes').Absence;
var Excuse = require('../../models/notes').EarlyExcuse;
var ObjectId = require('mongoose').Schema.Types.ObjectId;
var config = require('../../config/forms');

module.exports = {
  'check': {
    'loggedIn': function(req, res, next) {
      if (req.isAuthenticated())
        return next();
      else
        return res.redirect('/login');
      next();
    }
  },
  'index': {
    'get': function(req, res, next) {
      res.render(templates.students.index, {
        user: req.user
      });
    }
  },
  'history': {
    get: function(req, res, next) {
      Note.find({
        _id: { $in : req.user.notes }
      }, function(err, notes) {
        if(err) return next(err);
        notes = notes.map(function(note){
          note = JSON.parse(JSON.stringify(note));
          var excused_date = new Date(note.excused_date);
          note.formatted_date = (excused_date.getMonth() + 1) + '/' + excused_date.getDate() + '/' + excused_date.getFullYear();
          if(note.approved){
            note.approved = 'check';
          }else{
            note.approved = 'times';
          }

          return note;
        });
        res.render(templates.students.history, {
          user: req.user,
          notes: notes
        });
      });
    }
  },
  'names': {
    get: function(req, res, next) {
      return res.json(Object.keys(require('../../emails').Teachers));
    }
  },
  'me':{
    post:function(req, res){
      return res.json(req.user);
    }
  }
};

module.exports.absence = require('./absence');
module.exports.profile = require('./profile');
module.exports.earlyexcuse = require('./earlyexcuse');
