var mongoose = require('mongoose');

var absenceSchema = mongoose.Schema({
    student : String,
    OSIS : Number,
    homeroom : String,
    excused: String,
    corrections: String,
    submission_date : String,
    excused_date : String,
    excuse : String
});

var Absence = mongoose.model('Absence', absenceSchema);
module.exports.Absence = Absence;
