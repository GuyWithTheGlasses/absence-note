var express = require('express');
var router = express.Router();

var handler = require('../handlers/index');

router.get('/logout', handler.accounts.logout.get);

router.use(handler.check.loggedIn);
if (process.env.env == 'development') {} else {
}

router.get('/', handler.index.get);
router.post('/', handler.index.post);

//login and register taken care of with google accounts
router.get('/login', handler.accounts.login.get);
router.get('/auth/google/callback', handler.accounts.authgooglecallback.get);

module.exports = router;
