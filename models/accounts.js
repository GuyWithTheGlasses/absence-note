var mongoose = require('mongoose');
var expect = require('expect.js');
var Absence = require('./absences.js').Absence;

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
  OSIS: { type: Number, min: [99999999, Absence.OSIS_ERROR_MESSAGE], max: [1000000000, Absence.OSIS_ERROR_MESSAGE] },
  homeroom: String,
  parents: [new mongoose.Schema({
    name: String,
    phone: String
  })],
  // list of absences
  absences: [mongoose.Schema.Types.ObjectId], // id number referencing other collection
  type: { type: String, default: 'Student' }
});
// export the model to be able to be accessed as Student
var Student = Account.discriminator('Student', studentSchema);
module.exports.Student = Student;

var teacherSchema = mongoose.Schema({
  // list of denied absence requests
  denied_absences: [mongoose.Schema.Types.ObjectId],
  // list of pending absence requests awaiting signatures
  pending_absences: [mongoose.Schema.Types.ObjectId], // reference to the absences collection
  // list of already approved absence forms
  approved_absences: [mongoose.Schema.Types.ObjectId],
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
  var absenceIndex = pending_absences.indexOf(absence_ID);
  var absenceIDFromArray = pending_absences.splice(absenceIndex, 1)[0];
  this.approved_absences.push(absenceIDFromArray);
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
  var absenceIndex = pending_absences.indexOf(absence_ID);
  var absenceIDFromArray = pending_absences.splice(absenceIndex, 1)[0];
  this.denied_absences.push(absenceIDFromArray);
  this.save(function(err) {
    if (err) return callback(err);
  });

};

var Teacher = Account.discriminator('Teacher', teacherSchema);
module.exports.Teacher = mongoose.model('Teacher', teacherSchema);
