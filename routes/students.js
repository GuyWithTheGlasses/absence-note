var express = require('express');
var router = express.Router();

var handlers = require('../handlers/students');

router.use(handlers.check.loggedIn);

router.get('/', handlers.index.get);

// router.get( '/earlyexcuse/:id', handlers.earlyexcuse.id.get );
// router.get( '/earlyexcuse', handlers.earlyexcuse.get );

router.get('/absence/create', handlers.absence.create.get);
router.post('/absence/create', handlers.absence.create.post);

router.get('/absence/:id', handlers.absence.id.get);
router.post('/absence/:post', handlers.absence.id.post);

router.get('/history', handlers.history.get);
router.get('/profile', handlers.profile.get);
router.post('/profile', handlers.profile.post);

module.exports = router;
