var messages = require('../config/messages');
var passport = require('../app').passport;
var templates = require('../config/templates');


module.exports = {
  'index': {
    get: function(req, res) {
      res.render(templates.index);
    },
    post: function(req, res, next) {
      console.log('Posted to index!');
      next();
    }
  },
  'check': {
    loggedIn: function(req, res, next) {
      if (req.isAuthenticated() && req.user) {
        switch (req.user.type) {
          case 'Student':
            return res.redirect('/student');
          case 'Teacher':
            return res.redirect('/teacher');
          case 'Admin':
            return res.redirect('/admin');
          default:
            return res.redirect('/logout');
        }
      } else return next();
    }
  }
};

module.exports.accounts = require('./accounts');
module.exports.error = require('./error');
