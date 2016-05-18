var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var expect = require('expect.js');

/**
 * Work factor for bcrypt
 * @const {Number}
 */
var SALT_ROUNDS = 10;

var accountSchema = mongoose.Schema({
  username: String, // should be uniform tbh
  password: String, // hashed
  email: String, // To be verified
  type: String, // Admin, Student, Teacher
  verified: Boolean
});

/**
 * Hashes passwords
 * @param  {String}   password
 * @param  {Function} callback returns the hash
 */
accountSchema.methods.generateHash = function(password, callback) {
  bcrypt.hash(password, SALT_ROUNDS, function(err, hash) {
    expect(err).to.equal(undefined);
    return callback(hash);
  });
};

/**
 * Checks passwordsWeakx
 * @param  {String}   password
 * @param  {Function} callback returns whether the check was correct or falsy
 */
accountSchema.methods.authenticate = function(password, callback) {
  bcrypt.compare(password, this.password, function(err, match) {
    expect(err).to.equal(undefined);
    return callback(match);
  });
};

accountSchema.methods.register = function(callback){
  if(!this.type) this.type = 'Student';
  this.verified = !(this.type == 'Admin' || this.type == 'Teacher') ;
  this.save(function(err){
    return callback(err);
  });
};

var Account = mongoose.model('Account', accountSchema);
module.exports.Account = Account;

var studentSchema = mongoose.Schema({
  // personal constant student data
  OSIS: Number,
  homeroom: String,
  parents: [{
    name: String,
    phone: String
  }],
  // list of absences
  absences: [Number], // id number referencing other collection
});

//absences
//     {
//     date: String,
//     excuse: String,
//     // list of affected teachers
//     teachers: [String]
// }]

// export the model to be able to be accessed as Student
var Student = Account.discriminator('Student', studentSchema);
module.exports.Student = Student;

var teacherSchema = mongoose.Schema({
  // list of pending absence requests awaiting signatures
  pending_requests: [Number], // reference to the absences collection to save db mem
  //   {
  //   student_name: String,
  //   period: Number,
  //   date: String,
  //   excuse: String
  // }],

  // list of already approved absence forms
  approved_absences: [{
    student_name: String,
    period: Number,
    date: String,
    excuse: String
  }]
});

var Teacher = Account.discriminator('Teacher', teacherSchema);
module.exports.Teacher = mongoose.model('Teacher', teacherSchema);
