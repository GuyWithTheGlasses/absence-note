var Absence = require('./models/absences').Absence;
var Teacher = require('./models/accounts').Teacher;
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/absence');

Absence.find(function(err ,absences){
  console.log('err', err);
  console.log('absences', absences);
  Absence.findById(absences[0]._id, function(err, absence){
    console.log(absence);
  });
});
