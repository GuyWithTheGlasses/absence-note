var messages = require('../../config/messages');
var templates = require('../../config/templates');
var passport = require('../../app/passport');

module.exports = {
  'index':{
    get: function(req, res){
      res.render(templates.users.index);
    },
    post: function(req, res, next){
      next();
    }
  }
};
