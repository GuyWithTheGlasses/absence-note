var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var expect = require('expect.js');

/**
 * Work factor for bcrypt
 * @const {Number}
 */
var SALT_ROUNDS = 10;

var studentSchema = mongoose.Schema({
    // login information
    username: String,
    password: String,
    email: String,

    // personal constant student data
    OSIS: Number,
    homeroom: String,
    parents: [{
	name: String,
	phone: String
    }],

    // list of absences
    absences: [{
	date: String,
	excuse: String,
	// list of affected teachers
	teachers: [String]
    }]
});

// export the model to be able to be accessed as Student
module.exports.Student = mongoose.model('Student', studentSchema);

var adminSchema = mongoose.Schema({
    username : String,
    password : String,
    email : String
});

// essentially only for Ms. Cintron
module.exports.Admin = mongoose.model('Admin', adminSchema);

var teacherSchema = mongoose.Schema({
    // login information
    username : String,
    password : String,
    email : String,

    // list of pending absence requests awaiting signatures
    pending_requests : [{
	student_name : String,
	period : Number,
	date : String,
	excuse : String 
    }],

    // list of already approved absence forms
    approved_absences : [{
	student_name : String,
	period : Number,
	date : String,
	excuse : String 
    }]
});

module.exports.Teacher = mongoose.model('Teacher', teacherSchema);
