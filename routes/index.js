var express = require('express');
var router = express.Router();

var handler = require('../handlers/index');

router.get('/logout', handler.accounts.logout.get);
router.use(handler.check);

// router.use(function(req,res,next){//redirects to specific type
//   if(req.user && req.isAuthenticated()){
//     if(req.user.type == 'Student') return res.redirect('/student');
//     if(req.user.type == 'Teacher') return res.redirect('/teacher');
//     if(req.user.type == 'Admin') return res.redirect('/admin');
//   }else return next();
// });


router.get('/', handler.index.get);
router.post('/', handler.index.post);

//login and register taken care of with google accounts
router.get('/login', handler.accounts.login.get);
router.get('/auth/google/callback', handler.accounts.authgooglecallback.get);

module.exports = router;
