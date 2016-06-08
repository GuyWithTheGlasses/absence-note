var Teacher = require('./models/accounts').Teacher;
var Absence = require('./models/notes').Absence;
var notes = require('./models/notes');
var Absence = notes.Absence;
var EarlyExcuse = notes.EarlyExcuse;
var Note = notes.Note;
var accounts = require('./models/accounts');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/absence');

var new_note = new Absence();
new_note.student = 'Leon Chou';
new_note.OSIS = 203766068;
new_note.homeroom = '7QQ';
new_note.excused = 'absence-excuse';
new_note.corrections = null;
new_note.submission_date = "05/21";
new_note.excused_date = "05/14";
new_note.excuse = "Went to dentist";
new_note.kind = "absence";
new_note.schedule = {
  'Period': 1,
  //'Teacher': mongoose.Types.ObjectId("104139858999820438162"),
  'Course Code' : 'LOL',
  'approved' : false
};

/* ------------------ ADDS ---------------- */
// new_note.add( function(err){
//     if (err)
// 	return console.log( err );
//     return;
// });

/* ------------------ REMOVES --------------------- */
Absence.remove({excused_date: new_note.excused_date} ,function(err,removed){
    console.log('err');
  //console.log(removed);
});


/* ------------------ QUERIES -------------------- */
// Absence.find(function(err,absences){
//   console.log('err', err);
//   console.log('absences', absences);
//   Absence.findById(absences[0]._id, function(err, absence){
//     absence.approve(function(err){
//       if(err) console.log(err);
//     });
//     console.log(absence._id);
//     console.log(absence);
//     console.log(absence.student);
//   });
// });

// Note.find(function(err,notes){
//   console.log('err',err);
//   console.log('notes',notes);
//   console.log('notes[0]',notes[0]);
//   console.log('notes[0].student',notes[0].student);
//   Note.findById(notes[0]._id,function(err,note){
//     console.log(note);
//   });
// });


/* ----------------- DELETES FROM ALL TEACHERS -------------- */
// new_note.delete(function(err){
//    if (err)
//     return console.log(err);
//   return;
// });


/* ---------- TEACHER METHODS -------------- */
Teacher.find( function(err, teachers){
  console.log('teachers', teachers);
  Teacher.findById(teachers[0]._id, function(err,teacher){
    console.log('teacher', teacher);
    console.log('teacher name', teacher.google.name);
    // teacher.courses.push('LOL');
    // teacher.save(function(err){
    //   console.log('err', err);
    // });
    console.log('teacher courses', teacher.courses);
    console.log('teacher notes', teacher.notes);
  });
});
