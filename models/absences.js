var mongoose = require('mongoose');
var accounts = require('./accounts');

var OSIS_ERROR_MESSAGE = 'Please enter a valid OSIS';

var EXCUSED_ENUM = { values: 'absence-excuse lateness-excuse absence-correction lateness-correction cuts'.split(' '),
		     message: 'enum validator failed for path `{PATH}` with value `{VALUE}`' };

var absenceSchema = mongoose.Schema({
  student: String,
    // make sure the OSIS is 9 digits
  OSIS: { type: Number, min: [99999999, OSIS_ERROR_MESSAGE], max: [1000000000, OSIS_ERROR_MESSAGE] },
  homeroom: String,
  excused: {type: String, enum: EXCUSED_ENUM, lowercase: true},
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
    'Teacher': mongoose.Schema.Types.ObjectId,
    'Course Code': String
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
    accounts.Teacher.findOneAndUpdate({ "google.name": course.Teacher }, { $push: { "pending_absences": absence } });
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
  absence.save(function(err) {
    if (err)
      return callback(err);
  });
};

var Absence = mongoose.model('Absence', absenceSchema);
module.exports.Absence = Absence;
