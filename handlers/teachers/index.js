module.exports = {
  'check':{
    loggedIn:function(req,res,next){
      if(!req.isAuthenticated() || req.user.type !== 'Teacher') return res.redirect('/login');
      else return next();
    },
  },
  'index':{
    get:function(req,res,next){
      res.render(templates.teachers.index, {user:req.user});
    }
  }
};
