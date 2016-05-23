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
  schedule : new mongoose.Schema({
    "Course Code": String
  }),
  approved : Boolean;
});

absenceSchema.methods.add = function(err){
    if (err) throw err;

    absence = this.objectId;
    accounts.Student.findOne({ 'OSIS' : this.OSIS}, function(err, student){
	if (err) throw err;

	// add to the student's absences
	student.absences.push(absence);

	// save the student
	student.save(function(err){
	    if (err) throw err;
	    console.log("Absence successfully saved to student");
	});
    });
    
    //accounts.Teacher.findOne({ 
    
    this.save(function(err){
	if (err){
	    console.log("Error in saving");
	    throw err;
    });
}

var Absence = mongoose.model('Absence', absenceSchema);
module.exports.Absence = Absence;
