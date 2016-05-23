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
      'Period 1': String,
      'Period 2': String,
      'Period 3': String,
      'Period 4': String,
      'Period 5': String,
      'Period 6': String,
      'Period 7': String,
      'Period 8': String,
      'Period 9': String,
      'Period 10': String
  })
});

var Absence = mongoose.model('Absence', absenceSchema);
module.exports.Absence = Absence;
