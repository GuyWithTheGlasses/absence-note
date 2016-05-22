var templates = require('../../config/templates');
module.exports = {
  'check': {
    'loggedIn':function(req,res,next){
      if(req.isAuthenticated) return next();
      else return res.redirect('/login');
    }
  },
  'index': {
    'get': function(req, res, next) {
      return next();
    }
  },
  'absencenote':{
    get:function(req,res, next){
      if(!req.user) return next('Missing User');
      res.render(templates.students.absencenote, {user:req.user});
    }
  }
};
