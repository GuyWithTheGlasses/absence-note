var express = require('express');
var Student = require('../../models/accounts').Student;

var templates = require('../../config/templates');
var messages = require('../../config/messages');

module.exports = {
  get: function(req, res, next) { // View profile and edit
    res.render(templates.students.profile, { user: req.user });
  },
  post: function(req, res) { // Receives updated profile
    var studentForm = req.body;
    var studentFormParams = require('../../config/forms').student;
    for (var field in studentForm) {
      if (!(studentForm.field in studentFormParams)) {
        delete studentFormParams.field;
      }
    }
    Student.find(req.user, function(err, student) {
      if (err) return res.json(messages.student.profile.edit_fail(err));
      return res.json(messages.student.profile.edit_success(student));
    });
  },
  'ajax': {
    get: function(req, res) {
      // Middleware to provide frontend js with a way to access their user
      res.json(req.user);
    }
  }
};
