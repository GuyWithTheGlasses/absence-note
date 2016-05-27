var express = require( 'express' );
var router = express.Router();

var handlers = require( '../handlers/students' );

router.use( handlers.check.loggedIn );

router.get( '/', handlers.index.get );

router.get( '/earlyexcuse/:id', handlers.earlyexcuse.id.get );
router.get( '/earlyexcuse', handlers.earlyexcuse.get );

router.get( '/absence/create', handlers.absences.create.get );
router.post( '/absence/create', handlers.absences.create.post );

router.get( '/absence/:id', handlers.absences.id.get );

router.get( '/history', handlers.history.get );
router.get( '/profile', handlers.profile.get );

module.exports = router;
