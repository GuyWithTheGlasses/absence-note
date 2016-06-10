var picker = new Pikaday( {
  field: document.getElementById( 'excused-date' ),
  disableWeekends: true
} );

var calendar = document.getElementById( "calendar-button" );

calendar.addEventListener( "click", function( e ) {
  e.preventDefault();
  picker.show();
} );
