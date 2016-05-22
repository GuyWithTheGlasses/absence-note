var express = require('express');
var router = express.Router();

var handler = require('../handlers/index');

router.use(function(req,res,next){//testing
  next();
});


router.get('/', handler.index.get);
router.post('/', handler.index.post);

//login and register taken care of with google accounts
router.get('/login', handler.accounts.login.get);
router.get('/auth/google/callback', handler.accounts.authgooglecallback.get);

router.get('/logout', handler.accounts.logout.get);

router.use(handler.error['404']);
if(process.env.DEVELOPMENT) router.use(handler.error.development);
router.use(handler.error.production);

module.exports = router;
