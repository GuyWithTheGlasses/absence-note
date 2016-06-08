var express = require('express');
var router = express.Router();

var handler = require('../handlers/students');

if (process.env.env == 'development') {} else {
  router.use(handler.check.loggedIn);
}

router.get('/', handler.index.get);

// router.get( '/earlyexcuse/:id', handler.earlyexcuse.id.get );
// router.get( '/earlyexcuse', handler.earlyexcuse.get );

router.get('/absence/create', handler.absence.create.get);
router.post('/absence/create', handler.absence.create.post);

router.get('/absence/:id', handler.absence.id.get);
router.post('/absence/:post', handler.absence.id.post);

router.get('/history', handler.history.get);
router.get('/profile', handler.profile.get);
router.post('/profile', handler.profile.post);

module.exports = router;
