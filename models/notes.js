/*jshint -W083 */
var mongoose = require('mongoose');
var accounts = require('./accounts');

var OSIS_ERROR_MESSAGE = 'Please enter a valid OSIS';

var ABSENCE_EXCUSED_ENUM = {
  values: 'absence-excuse lateness-excuse absence-correction lateness-correction cuts'.split(' '),
  message: 'enum validator failed for path `{PATH}` with value `{VALUE}`'
};

var noteSchema = mongoose.Schema({
  student: String,
  // makes sure the OSIS is 9 digits long
  OSIS: {
    type: Number,
    min: [99999999, OSIS_ERROR_MESSAGE],
    max: [1000000000, OSIS_ERROR_MESSAGE]
  },
  homeroom: String,
  excused_date: Date,
  submission_date: Date,
  excuse: String,
  parent: new mongoose.Schema({
    'Signature': new mongoose.Schema({
      'signature': {
        type: String,
        default: 'Unsigned'
      },
      'date': Date
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
 * Factory method to add notes to all teachers and student associated with the note
 * @param  {Function} callback returns null if good else returns err
 */
noteSchema.methods.add = function(callback) {
  note = this;
  accounts.Student.findOneAndUpdate({
    OSIS: this.OSIS
  }, { "notes": { $push: note._id } });
  for (var courseIndex in this.schedule) {
    var course = this.schedule[courseIndex];
    accounts.Teacher.findByIdAndUpdate(course.Teacher, { "notes.pending": { $push: note._id } });
  }

  note.save(function(err) {
    if (err) {
      console.log("Error in saving");
      callback(err);
    } else return callback();
  });
};


/**
 * Method that will set the note's approved value to true
 * @param  {Function} callback returns null if good else returns err
 */
noteSchema.methods.approve = function(callback) {
  note = this;
  note.approved = true;
  note.save(function(err) {
    if (err)
      return callback(err);
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
      accounts.Teacher.findByIdAndUpdate(course.Teacher, { "notes.approved": { $pull: note._id } });
    }
    if (!(this.approved)) {
      accounts.Teacher.findByIdAndUpdate(
        course.Teacher,
        function(err, teacher) {
          if (err)
            return callback(err);
          if (note._id in teacher.notes.denied)
            return { "notes.denied": { $pull: note._id } };
          else
            return { "notes.pending": { $pull: note._id } };
        });
    }
  }
  note.remove(function(err) {
    if (err)
      throw callback(err);
  });
};

var Note = mongoose.model('Note', noteSchema);
module.exports.Note = Note;

var absenceSchema = mongoose.Schema({
  excused: {
    type: String,
    enum: ABSENCE_EXCUSED_ENUM,
    lowercase: true
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
