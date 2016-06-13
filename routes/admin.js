var express = require( 'express' );
var router = express.Router();

var handler = require( '../handlers/admin' );

// If development dont check if logged in
if ( process.env.env == 'development' ) {} else {
  router.use( handler.check.loggedIn );
}

router.get( '/', handler.index.get );

router.get('/student/:id', handler.student.id.get);

router.post( '/note/:id/approve', handler.note.id.approve );
router.post( '/note/:id/deny', handler.note.id.deny );

router.get( '/absence/:id', handler.note.absence.id.get );
router.get( '/earlyexcuse/:id', handler.note.earlyexcuse.id.get );

router.get( '/absences', handler.absences );
router.get( '/earlyexcuses', handler.earlyexcuses );
router.get( '/students', handler.students );
router.get( '/history', handler.history );

module.exports = router;
