var express = require('express');
var router = express.Router();

var handler = require('../handlers/index');

router.get('/logout', handler.accounts.logout.get);

if (process.env.env == 'development') {} else {
  router.use(handler.check.loggedIn);
}

router.get('/', handler.index.get);
router.post('/', handler.index.post);
router.get('/teachers', handler.teachers);


//login and register taken care of with google accounts
router.get('/login', handler.accounts.login.get);
router.get('/auth/google/callback', handler.accounts.authgooglecallback.get);

module.exports = router;
