var mongoose = require('mongoose');
var accounts = require('./accounts');

var OSIS_ERROR_MESSAGE = 'Please enter a valid OSIS';

var absenceSchema = mongoose.Schema({
  student: String,
  OSIS: { type: Number, min: [99999999, OSIS_ERROR_MESSAGE], max: [1000000000, OSIS_ERROR_MESSAGE] }, // Make sure its 9 digits
  homeroom: String,
  excused: String,
  submission_date: String,
  excused_date: String,
  excuse: String,
  parent: new mongoose.Schema({
    'Signature': { type: String, default: 'Unsigned' },
    'Name': String,
    "Date of Signature": String
  }),
  schedule: [new mongoose.Schema({
    'Period': Number,
    'Teacher': String,
    'Course Code': String,
  })],
  approved: { type: Boolean, default: false }
});

/**
 * Factory method to add absences to all teachers and student associated with the absence
 * @param  {Function} callback returns null if good else returns err
 */
absenceSchema.methods.add = function(callback) {
  absence = this.objectId;
  accounts.Student.findOneAndUpdate({ OSIS: this.OSIS }, { $push: { "absences": absence } });
  absence = this;
  accounts.Student.findOneAndUpdate({ OSIS: this.OSIS }, { $push: { "absences": absence._id } });
  for (var courseIndex in this.schedule) {
    var course = this.schedule[courseIndex];
    accounts.Teacher.findOneAndUpdate({ "google.name": course.Teacher }, { $push: { "pending_requests": absence } });
  }

  this.save(function(err) {
    if (err) {
      console.log("Error in saving");
      callback(err);
    } else return callback();
  });
};

absenceSchema.methods.approve = function(callback) {
  absence = this;
  absence.approved = true;
  for (var courseIndex in this.scheule) {
    var course = this.schedule[courseIndex];
    accounts.Teacher.findOneAndUpdate({ "google.name": course.Teacher }, {
      $push: { "approved_absences": absence.objectId },
      $pull: { "pending_requests": absence.objectId }
    }, function(err, teacher) {
      if (err)
        return callback(err);
    });
  }
  absence.save(function(err) {
    if (err)
      return callback(err);
  });
};

var Absence = mongoose.model('Absence', absenceSchema);
module.exports.Absence = Absence;
