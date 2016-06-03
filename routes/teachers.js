var express = require('express');
var router = express.Router();

var handlers = require('../handlers/teachers');

if(process.env.env == 'development'){
}else{
  router.use(handlers.check.loggedIn);
}

router.get('/', handlers.index.get);

router.get('/history', handlers.absence.get);

router.get('/absence/pending', handlers.absence.id.pending); // View a list of all pending absences
router.post('/absence/:id/approve', handlers.absence.id.approve);// Approves absence
router.post('/absence/:id/deny', handlers.absence.id.deny); // Denies absence
router.get('/absence/:id', handlers.absence.id.get); // Views absence

module.exports = router;
