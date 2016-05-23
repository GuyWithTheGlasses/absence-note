var mongoose = require('mongoose');

var absenceSchema = mongoose.Schema({
  student: String,
  OSIS: Number,
  homeroom: String,
  excused: String,
  corrections: String,
  submission_date: String,
  excused_date: String,
  excuse: String,
  parent: new mongoose.Schema({
    'Signature': { type: String, default: 'Unsigned' },
    'Name': String,
    "Date of Signature": String
  }),
  schedule : new mongoose.Schema({
      'Period 1': { teacher_name: String, course_code: String },
      'Period 2': { teacher_name: String, course_code: String },
      'Period 3': { teacher_name: String, course_code: String },
      'Period 4': { teacher_name: String, course_code: String },
      'Period 5': { teacher_name: String, course_code: String },
      'Period 6': { teacher_name: String, course_code: String },
      'Period 7': { teacher_name: String, course_code: String },
      'Period 8': { teacher_name: String, course_code: String },
      'Period 9': { teacher_name: String, course_code: String },
      'Period 10': { teacher_name: String, course_code: String }
  })
});

var Absence = mongoose.model('Absence', absenceSchema);
module.exports.Absence = Absence;
