var express = require('express');
var router = express.Router();

var handler = require('../../handlers/admin');

router.use(handler.check);

router.get('/', handler.index.get);

router.get('/absences/:id', handler.absences.id.get);
router.post('/absences/:id', handler.absences.id.post);

router.get('/absences', handler.absences.get);
router.post('/absences', handler.absences.post);

module.exports = router;
