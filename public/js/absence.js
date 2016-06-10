var correctionBox = document.getElementById( "correction-box" );
var excusedBox = document.getElementById( "excused-box" );
var masterBox = document.getElementById( "master-box" );

var correction = document.getElementById( "correction" );
var excused = document.getElementById( "excused" );

correction.addEventListener( "click", function( e ) {
  e.preventDefault();
  correctionBox.style.display = "block";
  excusedBox.style.display = "none";
} );

excused.addEventListener( "click", function( e ) {
  e.preventDefault();
  excusedBox.style.display = "block";
  correctionBox.style.display = "none";
} );

var picker = new Pikaday( {
  field: document.getElementById( 'excused-date' ),
  disableWeekends: true
} );

var calendar = document.getElementById( "calendar-button" );

calendar.addEventListener( "click", function( e ) {
  e.preventDefault();
  picker.show();
} );

var ABSENCE_FORM_CLASS = 'absence-form';
var SUBMIT_BUTTON = 'form-submit-ajax';
var PDF_BUTTON = 'form-create-pdf';
var TEXT_INPUT = 'input';
var EXPLANATION_INPUT = 'explanation';
var PERIOD_CHECKBOX = 'checkbox';
var FORM_ENTRIES = 'form-entry';
var ERROR_MESSAGE = 'error-message';
var RADIO_BUTTON_DIV = 'master-options';
var RADIO_BUTTON = 'excusemestopreading';

var setupForms = function( event ) {
  //Add click listeners to all buttons in form
  forEachInClass( document, RADIO_BUTTON, function( radio_button ) {
    radio_button.addEventListener( 'click', function( e ) {
      e.preventDefault();
      //When this button is clicked
      //Delete all other "clicked" classes
      if ( this.id != "excused" && this.id != "correction" ) {
        forEachInClass( document, RADIO_BUTTON, function( radio_button ) {
          if ( radio_button.id != "excused" && radio_button.id != "correction" ) {
            radio_button.classList.remove( 'clicked' );
          }
        } );
      } else {
        forEachInClass( document, RADIO_BUTTON, function( radio_button ) {
          radio_button.classList.remove( 'clicked' );
        } );
        //Add the "clicked" class to this button
      }
      this.classList.add( 'clicked' );
    } );
  } );
};

document.addEventListener( 'DOMContentLoaded', setupForms );
