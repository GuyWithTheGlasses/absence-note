var express = require('express');
var router = express.Router();

var handlers = require('../handlers/users/index');

router.get('/', handlers.index.get);
router.post('/', handlers.index.post);

module.exports = router;
