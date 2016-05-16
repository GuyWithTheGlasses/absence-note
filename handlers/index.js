var messages = require('../config/messages');
var passport = require('../app').passport;
var templates = require('../config/templates');


module.exports = {
  'index':{
    get:function(req, res){
      res.render(templates.index);
    },
    post:function(req, res, next){
      console.log('Posted to index!');
      next();
    }
  }
};
module.exports.accounts = require('./accounts');

module.exports.error = require('./error');
