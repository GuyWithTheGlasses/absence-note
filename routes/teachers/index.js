var express = require('express');
var router = express.Router();

var handlers = require('../../handlers/teachers');

if(process.env.env == 'development'){
}else{
  router.use(handlers.check.loggedIn);
}

router.get('/', handlers.index.get);
router.get('/absences', handlers.absences.get);
router.get('/absences/:id', handlers.absences.id.get);

module.exports = router;
