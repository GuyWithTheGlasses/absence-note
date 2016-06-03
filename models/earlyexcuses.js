var mongoose = require('mongoose');
var accounts = require('./accounts');
var absences = require('./absences');

var OSIS_ERROR_MESSAGE = absences.OSIS_ERROR_MESSAGE;

var EXCUSED_ENUM = absences.EXCUSED_ENUM;

var earlyExcuseSchema = mongoose.Schema({
  student: String,
  // make sure the OSIS is 9 digits
  OSIS: {
    type: Number,
    min: [99999999, OSIS_ERROR_MESSAGE],
    max: [1000000000, OSIS_ERROR_MESSAGE]
  },
  homeroom: String,
  current_time: String,
  exiting_time: String,
  submission_date: String,
  excused_date: Date,
  excuse: String,
  parent: new mongoose.Schema({
    'Signature': new mongoose.Schema({
      'signature': {
        type: String,
        default: 'Unsigned'
      },
    }),
    'Name': String,
  }),
  schedule: [new mongoose.Schema({
    'Period': Number,
    'Teacher': mongoose.Schema.Types.ObjectId,
    'Course Code': String,
    'approved': {
      type: Boolean,
      default: false
    }
  })],
  approved: {
    type: Boolean,
    default: false
  }
});

/**
 * Factory method to add absences to all teachers and student associated with the early excuse
 * @param  {Function} callback returns null if good, else returns err
 */
earlyExcuseSchema.methods.add = function(callback) {
  early_excuse = this;
  accounts.Student.findOneAndUpdate({
    OSIS: this.OSIS,
  }, {"early_excuses" : {$push: early_excuse._id }});
  for (var courseIndex in this.schedule) {
    var course = this.schedule[courseIndex];
    accounts.Teacher.findByIdAndUpdate(course.Teacher,
	{"early_excuses.pending": {$push: early_excuse._id}});
  }

  this.save(function(err) {
    if (err) {
      console.log("Error in saving");
      callback(err);
    } 
    else 
      return callback();
  });
};

earlyExcuseSchema.methods.approve = function(callback) {
  early_excuse = this;
  early_excuse.approved = true;
  early_excuse.save(function(err) {
    if (err)
      return callback(err);
  });
};

earlyExcuseSchema.methods.remove = function(callback) {
  early_excuse = this;
  accounts.Student.findOneAndUpdate({
    OSIS: this.OSIS
  }, {"early_excuses": {$pull: early_excuse._id}});
  for (var courseIndex in this.schedule) {
    var course = this.schedule[courseIndex];
    if (this.approved) {
      accounts.Teacher.findByIdAndUpdate(course.Teacher,
	{"early_excuses.approved": {$pull: early_excuse._id}});
    }
    if (!(this.approved)) {
      accounts.Teacher.findByIdAndUpdate(course.Teacher, 
	{"early_excuses.pending": {$pull: early_excuse._id}},
	function(err){
	    if (err)
		return callback(err);
      });
      accounts.Teacher.findByIdAndUpdate(course.Teacher,
	{"early_excuses.pending" : {$pull: early_excuse._id}},
	function (err){
	    if (err)
		return callback(err);
      });
    }
  }
  early_excuse.remove(function(err) {
    if (err)
      throw callback(err);
  });
};

var EarlyExcuse = mongoose.model( 'EarlyExcuse', earlyExcuseSchema );
module.exports.EarlyExcuse = EarlyExcuse;
