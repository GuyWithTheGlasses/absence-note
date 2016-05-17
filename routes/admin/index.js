var express = require('express');
var router = express.Router();

var handler = require('../../handlers/admin');

router.get('/absences', handler.absences.get);
router.post('/absences', handler.absences.post);

router.get('/absences/:id', handler.absences.id.get);
router.post('/absences/:id', handler.absences.id.post);

module.exports = router;
