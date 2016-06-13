var express = require('express');
var router = express.Router();

var handlers = require('../handlers/teachers');

if (process.env.env == 'development') {} else {
  router.use(handlers.check.loggedIn);
}

router.get('/', handlers.index.get);

router.get('/history', handlers.history.get);
router.get('/pending_requests', handlers.pending_requests.get);

// router.get('/absence/pending', handlers.absence.id.pending); // View a list of all pending absences
router.post('/note/:id/approve', handlers.note.id.approve); // Approves absence
router.post('/note/:id/deny', handlers.note.id.deny); // Denies absence
router.get('/note/absence/:id', handlers.note.absence); // Views absence
router.get('/note/earlyexcuse/:id', handlers.note.earlyexcuse); // Views excuse

module.exports = router;
