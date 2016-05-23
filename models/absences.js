var mongoose = require('mongoose');

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
  schedule : new mongoose.Schema({
    period: Number,
    course: String
  })
});

var Absence = mongoose.model('Absence', absenceSchema);
module.exports.Absence = Absence;
