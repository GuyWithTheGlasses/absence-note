var express = require('express');
var router = express.Router();

var handlers = require('../../handlers/teachers');

router.use(handlers.check.loggedIn);

router.get('/', handlers.index.get);


module.exports = router;
