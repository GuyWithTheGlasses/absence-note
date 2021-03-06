/*jshint -W083 */
var mongoose = require('mongoose');
var accounts = require('./accounts');

var OSIS_ERROR_MESSAGE = 'Please enter a valid OSIS';

var ABSENCE_EXCUSED_ENUM = {
  values: 'absence-excuse lateness-excuse absence-correction lateness-correction cuts'.split(' '),
  message: 'enum validator failed for path `{PATH}` with value `{VALUE}`'
};

var KIND_ENUM = {
  values: 'Absence EarlyExcuse'.split(' '),
  message: 'enum validator failed for path `{PATH}` with value `{VALUE}`'
};

var noteSchema = mongoose.Schema({
  kind: {
    type: String,
    enum: KIND_ENUM,
  },
  student: String,
  // makes sure the OSIS is 9 digits long
  OSIS: {
    type: Number,
    min: [99999999, OSIS_ERROR_MESSAGE],
    max: [1000000000, OSIS_ERROR_MESSAGE]
  },
  homeroom: String,
  excused_date: Date,
  submission_date: {type: Date, default: Date.now },
  excuse: String,
  parent: new mongoose.Schema({
    'name': String,
    'phone': String,
    'email': String,
    'relationship':String
  }),
  schedule: [new mongoose.Schema({
    'Period': String,
    'Teacher': String,
    'Course Code': String,
    'approved': {
      type: Boolean,
      default: false
    }
  })],
  approved: {
    type: Boolean,
    default: false
  },
  pending: {
    type: Boolean,
    default: true
  },
  denied: {
    type: Boolean,
    default: false
  }
});

/**
 * Factory method to add notes to all teachers and student associated with the note
 * @param  {Function} callback returns null if good else returns err
 */
noteSchema.methods.add = function(callback) {
  note = this;
  accounts.Student.findOneAndUpdate({
    OSIS: this.OSIS
  }, { "$push": { "notes": note._id } }, function(err, student){
  });
  for (var courseIndex in this.schedule) {
    var course = this.schedule[courseIndex];
    accounts.Teacher.findOneAndUpdate({"google.name": course.Teacher}, {"$push": { "notes.pending": note._id}}, function(err,teacher){
    } );
  }
  note.save(function(err) {
    if (err) {
      callback(err);
    } else return callback();
  });
};


/**
 * Method that will set the note's approved value to true
 * @param  {Function} callback returns null if good else returns err
 */
noteSchema.methods.approve = function(callback) {
  this.approved = true;
  this.pending = false;
  this.denied = false;
  this.save(function(err) {
    if (err && callback && typeof callback == 'function')
      return callback(err);
      return callback();
  });
};

/**
 * Method that will set the note's approved value to false
 * @param  {Function} callback returns null if good else returns err
 */
noteSchema.methods.deny = function(callback) {
  this.approved = false;
  this.pending = false;
  this.denied = true;
  this.save(function(err) {
    if (err && callback && typeof callback == 'function')
      return callback(err);
      return callback();
  });
};


/**
 * Method that will set delete the note
 * @param  {Function} callback returns null if good else returns err
 */
noteSchema.methods.delete = function(callback) {
  note = this;
  accounts.Student.findOneAndUpdate({
    OSIS: this.OSIS
  }, { "notes": { $pull: note._id } });
  for (var courseIndex in this.schedule) {
    var course = this.schedule[courseIndex];
    if (this.approved) {
      accounts.Teacher.findOneAndUpdate({"google.name": course.Teacher}, { "$pull": { "notes.approved": note._id } });
    }
    if (!(this.approved)) {
      accounts.Teacher.findOneAndUpdate({"google.name": course.Teacher},
        function(err, teacher) {
          if (err)
            return callback(err);
          if (note._id in teacher.notes.denied)
            return { "$pull": { "notes.denied": note._id } };
          else
            return { "$pull": { "notes.pending": note._id } };
        });
    }
  }
  note.remove(function(err) {
    if (err)
      return callback(err);
    return callback();
  });
};

var Note = mongoose.model('Note', noteSchema);
module.exports.Note = Note;

var absenceSchema = mongoose.Schema({
  excused: {
    type: String,
    enum: ABSENCE_EXCUSED_ENUM,
  }
});

var Absence = Note.discriminator('Absence', absenceSchema);
module.exports.Absence = Absence;

var earlyExcuseSchema = mongoose.Schema({
  current_time: String,
  exiting_time: String
});

var EarlyExcuse = Note.discriminator('EarlyExcuse', earlyExcuseSchema);
module.exports.EarlyExcuse = EarlyExcuse;
