var Teacher = require('./models/accounts').Teacher;
var notes = require('./models/notes');
var Absence = notes.Absence;
var EarlyExcuse = notes.EarlyExcuse;
var Note = notes.Note;
var accounts = require('./models/accounts');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/absence');

var nodemailerhelp = require('./config/index');

//var new_note = new Absence();
var new_note = new EarlyExcuse();
new_note.student = 'Johnny So';
new_note.OSIS = 205131501;
new_note.homeroom = '7EE';
//new_note.excused = 'absence-excuse';
new_note.corrections = null;
new_note.submission_date = "06/13";
new_note.excused_date = "06/10";
new_note.excuse = "fever";
//new_note.kind = "Absence";
new_note.kind = "EarlyExcuse";
new_note.current_time = "9:00 AM";
new_note.exiting_time = "12:00 PM";
new_note.schedule = {
  'Period': 1,
  'Teacher': 'Johnny So',
  'Course Code': 'LOL',
  'approved': false
};

/* ------------------ ADDS ---------------- */
// new_note.add( function(err){
//     if (err)
// 	return console.log( err );
//     return;
// });

/* ------------------ REMOVES --------------------- */
// Absence.remove({ excused_date: new_note.excused_date }, function(err, removed) {
//   console.log('err');
//   //console.log(removed);
// });


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
//     console.log('note date',note.excused_date);
//     console.log('note schedule[0].Teacher',note.schedule[0].Teacher);
//   });
// });


/* ----------------- DELETES FROM ALL TEACHERS -------------- */
// new_note.delete(function(err){
//    if (err)
//     return console.log(err);
//   return;
// });


// var dict = { 'hi': 'lol', 'asdasd': 'asdasd' };
// for (var key in dict) console.log(key);
//
// /* ---------- TEACHER METHODS -------------- */
Teacher.find(function(err, teachers) {
  console.log('teachers', teachers);
  Teacher.findById(teachers[0]._id, function(err, teacher) {
    console.log('teacher', teacher);
    console.log('teacher name', teacher.google.name);
    // teacher.courses.push('LOL');
    // teacher.save(function(err){
    //   console.log('err', err);
    // });
    console.log('teacher courses', teacher.courses);
    console.log('teacher notes.pending[0]', teacher.notes.pending[0]);
    teacher.approve(teacher.notes.pending[0],function(err){
      if (err)
        return console.log(err);
      return;
    })
  });
});
//
// nodemailerhelp.transporter.sendMail(nodemailerhelp.transport.emailOptions, function(err, info){
//     if(err){
//         return console.log(err);
//     }
//     console.log('Message sent: ' + info.response);
// });
