var mongoose = require('mongoose');
var expect = require('expect.js');

var accountSchema = mongoose.Schema({
  google:{
    id:String,
    token:String,
    name:String,
    emails:[new mongoose.Schema({
      value: String,
      type: String
    })]
  },
  type: {type:String, default:'Admin'} // Admin, Student, Teacher
});

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
  absences: [mongoose.Schema.Types.ObjectId], // id number referencing other collection
  type:{type:String, default:'Student'}
});
// export the model to be able to be accessed as Student
var Student = Account.discriminator('Student', studentSchema);
module.exports.Student = Student;

var teacherSchema = mongoose.Schema({
  // list of pending absence requests awaiting signatures
  pending_requests: [mongoose.Schema.Types.ObjectId], // reference to the absences collection
  // list of already approved absence forms
  approved_absences: [mongoose.Schema.Types.ObjectId],
  type:{type:String, default:'Teacher'}
});

var Teacher = Account.discriminator('Teacher', teacherSchema);
module.exports.Teacher = mongoose.model('Teacher', teacherSchema);
