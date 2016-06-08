// var Absence = require('./models/absences').Absence;
var Teacher = require('./models/accounts').Teacher;
var Absence = require('./models/notes').Absence;
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/absence');

// var note = new Absence();
// note.student = 'Leon Chou';
// note.OSIS = 203766068;
// note.homeroom = '7QQ';
// note.excused = 'absence-excuse';
// note.corrections = null;
// note.submission_date = "05/21";
// note.excused_date = "05/14";
// note.excuse = "Went to dentist";
// note.add( function(err){
//     if (err)
// 	return console.log( err );
//     return;
// });

Absence.find(function(err, absences) {
  console.log('err', err);
  console.log('absences', absences);
  if (absences.length !== 0) {
    Absence.findById(absences[0]._id, function(err, absence) {
      absence.approve(function(err) {
        if (err) console.log(err);
      });
      console.log(absence);
      console.log(absence.student);
    });
  }
});

Teacher.find(function(err, teachers) {
  console.log(teachers);
});
