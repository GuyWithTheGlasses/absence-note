var express = require('express');
var router = express.Router();

var handler = require('../../handlers/admin');

if(process.env.env == 'development'){
}else{
 router.use(handler.check.loggedIn);
}

router.get('/', handler.index.get);

router.get('/absences/:id', handler.absences.id.get);
router.post('/absences/:id', handler.absences.id.post);

router.get('/absences', handler.absences.get);

module.exports = router;
