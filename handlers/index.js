var messages = require('../config/messages');
var passport = require('../app').passport;
var templates = require('../config/templates');


module.exports.accounts = require('./accounts');
module.exports.index = {
  index:{
    get:function(req, res, next){
      res.render(templates.index);
    },
    post:function(req, res, next){
      console.log('Posted to index!');
      res.send(messages.index.post);
    }
  }
};

module.exports.error = require('./error');
