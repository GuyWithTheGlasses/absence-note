var mongoose = require('mongoose');
var expect = require('expect.js');
// var Absence = require('./absences.js').Absence;
// var EarlyExcuse = require('./earlyexcuses.js').EarlyExcuse;
var notes = require('./notes.js');
var Note = notes.Note;
var Absence = notes.Absense;
var EarlyExcuse = notes.EarlyExcuse;

var OSIS_ERROR_MESSAGE = 'Please enter a valid OSIS';

var accountSchema = mongoose.Schema({
  google: {
    id: String,
    token: String,
    name: String,
    emails: [new mongoose.Schema({
      value: { type: String},
      type: String,
    })]
  },
  type: { type: String, default: 'Admin' } // Admin, Student, Teacher
});

var Account = mongoose.model('Account', accountSchema);
module.exports.Account = Account;

var studentSchema = mongoose.Schema({
  // personal constant student data
  // makes sure the OSIS is 9 digits long
  OSIS: { type: Number, min: [99999999, OSIS_ERROR_MESSAGE], max: [1000000000, OSIS_ERROR_MESSAGE] },
  homeroom: String,
  parents: [new mongoose.Schema({
    name: String,
    relationship: String,
    phone: String
  })],
  // list of notes
  notes: [mongoose.Schema.Types.ObjectId],
  type: { type: String, default: 'Student' }
});
// export the model to be able to be accessed as Student
var Student = Account.discriminator('Student', studentSchema);
module.exports.Student = Student;

var teacherSchema = mongoose.Schema({
  notes: new mongoose.Schema({
    denied: [mongoose.Schema.Types.ObjectId],
    pending: [mongoose.Schema.Types.ObjectId],
    approved: [mongoose.Schema.Types.ObjectId]
  }),
  // list of courses taught
  courses: [String],
  type: { type: String, default: 'Teacher' }
});

teacherSchema.methods.approve = function(note_ID, callback) {
  Note.findByIdAndUpdate(note_ID, function(err, note) {
    if (err)
        return callback(err);
    for (var courseIndex in note.schedule) {
        var course = note.schedule[courseIndex];
        if (course.Teacher == this.objectId)
            course.approved = true;
    }
  });
  var noteIndex = this.notes.pending.indexOf(note_ID);
  var noteIDFromArray = this.notes.pending.splice(noteIndex, 1)[0];
  this.notes.approved.push(noteIDFromArray);
  this.save(function(err) {
    if (err)
      return callback(err);
  });
};

teacherSchema.methods.deny = function(note_ID, callback) {
  Note.findByIdAndUpdate(note_ID, function(err, note) {
    if (err)
      return callback(err);
    for (var courseIndex in note.schedule) {
      var course = note.schedule[courseIndex];
      if (course.Teacher == this.objectId)
        course.approved = false;
    }
  });
  var noteIndex = this.notes.pending.indexOf(note_ID);
  var noteIDFromArray = this.notes.pending.splice(noteIndex, 1)[0];
  this.notes.denied.push(noteIDFromArray);
  this.save(function(err) {
    if (err)
      return callback(err);
  });

};

var Teacher = Account.discriminator('Teacher', teacherSchema);
module.exports.Teacher = mongoose.model('Teacher', teacherSchema);
