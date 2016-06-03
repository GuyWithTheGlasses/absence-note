var express = require('express');
var router = express.Router();

var handlers = require('../handlers/teachers');

if(process.env.env == 'development'){
}else{
  router.use(handlers.check.loggedIn);
}

router.get('/', handlers.index.get);
router.get('/absence', handlers.absence.get);
router.get('/absence/:id', handlers.absence.id.get);
router.post('/absence/:id/approve', handlers.absence.id.approve);
router.post('/absence/:id/deny', handlers.absence.id.deny);


module.exports = router;
