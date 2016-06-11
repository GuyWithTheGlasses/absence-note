var express = require('express');
var router = express.Router();

var handler = require('../handlers/students');

if (process.env.env == 'development') {} else {
  router.use(handler.check.loggedIn);
}

router.get('/history', handler.history.get);
router.get('/profile', handler.profile.get);
router.post('/profile', handler.profile.post);

router.get('/', handler.index.get);

router.get('/names', handler.names.get);
router.post('/me', handler.me.post);

router.use(handler.profile.finished);
router.get('/absence/create', handler.absence.create.get);
router.post('/absence/create', handler.absence.create.post);
router.get('/earlyexcuse/create', handler.earlyexcuse.create.get);
router.post('/earlyexcuse', handler.earlyexcuse.create.post);

router.get('/absence/:id', handler.absence.id.get);
router.post('/absence/:post', handler.absence.id.post);
router.get('/earlyexcuse/:id', handler.earlyexcuse.id.get);
router.post('/earlyexcuse/:id', handler.earlyexcuse.id.post);

module.exports = router;
