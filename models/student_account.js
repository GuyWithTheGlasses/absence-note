var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var expect = require('expect.js');

/**
 * Work factor for bcrypt
 * @const {Number}
 */
var SALT_ROUNDS = 10;

var studentSchema = mongoose.Schema({
    username: String,
    password: String,
    email: String,
    OSIS: Number,
    homeroom: String,
    parent1 : {
	name: String,
	phone: String
    },
    parent2 : {
	name: String,
	phone: String
    },
    absences : {
	date : String,
	excuse: String,
    }
});
