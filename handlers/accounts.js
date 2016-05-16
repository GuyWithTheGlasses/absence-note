var passport = require('../app').passport;
var templates = require('../config/templates');
module.exports = {
  'login': {
    get: function(req, res, next) {
      res.render(templates.login);
    },
    post: function(req, res, next) {
      passport.authenticate('local-login', function(err, user, info) {
        if (err) return next(err);
        if (!user) return res.json(messages.failedLogin(info));
        req.login(user, function(err, id) {
          if (err) return next(err);
          req.session.id = id;
          console.log(req.session);
          return res.json(messages.successLogin);
        });
      })(req, res, next);
    }
  },
  'register': {
    get: function(req, res, next) {
      return next();
    },
    post:function(req, res, next){
      passport.authenticate('local-register', function (err, user, info) {
        if (err) return next(err);
        if (!user) return res.json(messages.register.failed(info));
        req.login(user, function (err, id) {
          if (err) return next(err);
          req.session.id = id;
          return res.json(messages.register.success);
        });
      })(req, res, next);
    }
  },
  'logout':{
    get:function(req,res,next){
      req.logout();
      next();
    },
    post:function(req,res,next){
      req.logout();
      res.send(messages.logout.post);
    }
  }
};
