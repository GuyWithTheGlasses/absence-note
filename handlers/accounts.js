var passport = require('../app').passport;
var templates = require('../config/templates');
var messages = require('../config/messages');
module.exports = {
  'login': {
    get: passport.authenticate('google', { scope: ['profile', 'email'] })
  },
  'authgooglecallback': {
    get: passport.authenticate('google', {successRedirect:'/', failureRedirect:'/'}),
  },
  'logout': {
    get: function(req, res, next) {
      req.logout();
      res.render(templates.logout);
    },
    post: function(req, res, next) {
      req.logout();
      res.send(messages.logout.post);
    }
  }
};
