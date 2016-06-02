var express = require('express');
var router = express.Router();

var handler = require('../handlers/admin');

// If development dont check if logged in
if(process.env.env == 'development'){
}else{
 router.use(handler.check.loggedIn);
}

router.get('/', handler.index.get);

router.post('/absence/:id/approve', handler.absence.id.approve);
router.post('/absence/:id/deny', handler.absence.id.deny);

router.get('/absence/:id', handler.absence.id.get);

router.get('/absence', handler.absence.get);

module.exports = router;
