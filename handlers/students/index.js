var templates = require('../../config/templates');
module.exports = {
  'check': {
    'loggedIn':function(req,res,next){
      console.log('hi');
      if(req.isAuthenticated()) return next();
      else return res.redirect('/login');
    }
  },
  'index': {
    'get': function(req, res, next) {
      res.render(templates.students.index);
    }
  },
  'absencenote':{
    get:function(req,res, next){
      if(!req.user) return next('Missing User');
      res.render(templates.students.absencenote, {user:req.user});
    }
  }
};
