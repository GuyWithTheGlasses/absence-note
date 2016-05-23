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
    'Period' : Number,
    'Teacher' : String,
    'Course Code': String
  }),
  approved : Boolean;
});

absenceSchema.methods.add = function(err){
    if (err) throw err;

    absence = this.objectId;
    accounts.Student.findOneAndUpdate(
	{ OSIS : this.OSIS},
	{ absences.push(absence) },
	function(err, student){
	    if (err) throw err;
	    console.log("Absence successfully saved to"+this.student);
	});
    });
    
    for (course in this.schedule){
	accounts.Teacher.findOneAndUpdate(
	    { google.name : course['Teacher'] }.where(course['Course Code'] in courses),
	    { pending_requests.push(absence) },
	    function (err, teacher){
		if (err) throw err,
		console.log("Absence successfully added to"+teacher.google.name);
	    });
    };
    
    this.save(function(err){
	if (err){
	    console.log("Error in saving");
	    throw err;
    });
}

var Absence = mongoose.model('Absence', absenceSchema);
module.exports.Absence = Absence;
