var express = require('express');
var router = express.Router();

var handler = require('../handlers/index');

router.use(handler.error['404']);
if(process.env.DEVELOPMENT) router.use(handler.error.development);
router.use(handler.error.production);

module.exports = router;
