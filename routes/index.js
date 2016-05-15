var express = require('express');
var router = express.Router();

var handler = require('../handlers/index');

router.get('/', handler.index.index.get);

router.get('/login', handler.accounts.login.get);
router.get('/register', handler.accounts.register.get);
router.get('/logout', handler.accounts.logout.get);
router.post('/login', handler.accounts.login.post);
router.post('/register', handler.accounts.register.post);

router.use(handler.error['404']);
if(process.env.DEVELOPMENT) router.use(handler.error.development);
router.use(handler.error.production);

module.exports = router;
