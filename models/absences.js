var mongoose = require('mongoose');
var accounts = require('./accounts');

var absenceSchema = mongoose.Schema({
  student: String,
  OSIS: Number,
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
    'Course Code': String
  })],
  approved: {type:Boolean, default:false}
});

absenceSchema.methods.add = function(callback) {
  absence = this.objectId;
  accounts.Student.findOneAndUpdate({ OSIS: this.OSIS }, { $push: { "absences": absence } },
    function(err, student) {
      if (err) return callback(err);
    }
  );

  for (var courseIndex in this.schedule) {
    var course = this.schedule[courseIndex];
    accounts.Teacher.findOneAndUpdate({ "google.name": course.Teacher }, { $push: { "pending_requests": absence } },
      function(err, teacher) {
        if (err) console.log(err);
      });
  }

  this.save(function(err) {
    if (err) {
      console.log("Error in saving");
      callback(err);
    }else return callback();
  });
};

var Absence = mongoose.model('Absence', absenceSchema);
module.exports.Absence = Absence;
