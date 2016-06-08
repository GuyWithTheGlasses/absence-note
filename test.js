// var Absence = require('./models/absences').Absence;
// var Teacher = require('./models/accounts').Teacher;
var notes = require('./models/notes');
var accounts = require('./models/accounts');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/absence');

var teacher = new accounts.Teacher();

var note = new notes.Absence();
note.student = 'Leon Chou';
note.OSIS = 203766068;
note.homeroom = '7QQ';
note.excused = 'absence-excuse';
note.corrections = null;
note.submission_date = "05/21";
note.excused_date = "05/14";
note.excuse = "Went to dentist";

/* ------------------ ADDS ---------------- */
// note.add( function(err){
//     if (err)
// 	return console.log( err );
//     return;
// });

/* ------------------ REMOVES --------------------- */
// notes.Absence.remove({excused_date: note.excused_date} ,function(err,removed){
//     console.log('err');
//   //console.log(removed);
// });


/* ------------------ QUERIES -------------------- */
// notes.Absence.find(function(err,absences){
//   console.log('err', err);
//   console.log('absences', absences);
//   notes.Absence.findById(absences[0]._id, function(err, absence){
//     absence.approve(function(err){
//       if(err) console.log(err);
//     });
//     console.log(absence._id);
//     console.log(absence);
//     console.log(absence.student);
//   });
// });

notes.Note.find(function(err,notes){
  console.log('err',err);
  console.log('notes',notes);
  console.log('notes[0]',notes[0]);
  console.log('notes[0].student',notes[0].student);
  notes.Note.findById(notes[0]._id,function(err,note){
    console.log(note);
  });
});


/* ----------------- DELETES FROM ALL TEACHERS -------------- */
// note.delete(function(err){
//    if (err)
//     return console.log(err);
//   return;
// });
