var mongoose = require('mongoose');
var expect = require('expect.js');
var Absence = require('./absences.js').Absence;
var EarlyExcuse = require('./earlyexcuses.js').EarlyExcuse;

var OSIS_ERROR_MESSAGE = 'Please enter a valid OSIS';

var accountSchema = mongoose.Schema({
  google: {
    id: String,
    token: String,
    name: String,
    emails: [new mongoose.Schema({
      value: { type: String, validate: /^.+@stuy.edu$/ },
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
    phone: String
  })],
  // list of absences
  absences: [mongoose.Schema.Types.ObjectId], // id number referencing other collection
  // list of early excuses
  early_excuses: [mongoose.Schema.Types.ObjectId],
  type: { type: String, default: 'Student' }
});
// export the model to be able to be accessed as Student
var Student = Account.discriminator('Student', studentSchema);
module.exports.Student = Student;

var teacherSchema = mongoose.Schema({
  absences: new mongoose.Schema({
    denied: [mongoose.Schema.Types.ObjectId],
    pending: [mongoose.Schema.Types.ObjectId],
    approved: [mongoose.Schema.Types.ObjectId]
  }),
  early_excuses: new mongoose.Schema({
    denied: [mongoose.Schema.Types.ObjectId],
    pending: [mongoose.Schema.Types.ObjectId],
    approved: [mongoose.Schema.Types.ObjectId]
  }),
  // list of courses taught
  courses: [String],
  type: { type: String, default: 'Teacher' }
});

teacherSchema.methods.approve = function(absence_ID, callback) {
  Absence.findByIdAndUpdate(absence_ID, function(err, absence) {
    if (err)
      return callback(err);
    for (var courseIndex in absence.schedule) {
      var course = absence.schedule[courseIndex];
      if (course.Teacher == this.objectId)
        course.approved = true;
    }
  });
  var absenceIndex = absences.pending.indexOf(absence_ID);
  var absenceIDFromArray = absences.pending.splice(absenceIndex, 1)[0];
  this.absences.approved.push(absenceIDFromArray);
  this.save(function(err) {
    if (err)
      return callback(err);
  });
};

teacherSchema.methods.deny = function(absence_ID, callback) {
  Absence.findByIdAndUpdate(absence_ID, function(err, absence) {
    if (err)
      return callback(err);
    for (var courseIndex in absence.schedule) {
      var course = absence.schedule[courseIndex];
      if (course.Teacher == this.objectId)
        course.approved = false;
    }
  });
  var absenceIndex = absences.pending.indexOf(absence_ID);
  var absenceIDFromArray = absences.pending.splice(absenceIndex, 1)[0];
  this.absences.denied.push(absenceIDFromArray);
  this.save(function(err) {
    if (err)
      return callback(err);
  });

};

var Teacher = Account.discriminator('Teacher', teacherSchema);
module.exports.Teacher = mongoose.model('Teacher', teacherSchema);
