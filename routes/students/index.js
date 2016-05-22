var express = require('express');
var router = express.Router();

var handlers = require('../../handlers/students');

router.use(handlers.check.loggedIn);

router.get('/', handlers.index.get);
router.get('/absencenote/:id', handlers.absencenote.id.get);



router.get('/absencenote', handlers.absencenote.get);
router.post('/absencenote', handlers.absencenote.post);


module.exports = router;
