var messages = require('../config/messages');

module.exports = {
  index:{
    get:function(req, res, next){
      res.render('index');
    },
    post:function(req, res, next){
      console.log('Posted to index!');
      res.send(messages.index.post);
    }
  }
};
