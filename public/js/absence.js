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

var correctionBox = document.getElementById( "correction-box" );
var excusedBox = document.getElementById( "excused-box" );
var masterBox = document.getElementById( "master-box" );

var correction = document.getElementById( "correction" );
var excused = document.getElementById( "excused" );

correction.style["background-color"] = "#00bfff";
excused.style["background-color"] = "#00bfff";

correction.addEventListener( "click", function( e ) {
  e.preventDefault();
  correctionBox.style.display = "block";
  excusedBox.style.display = "none";
  correction.style["background-color"] = "#00b300";
  forEachInClass(correctionBox, RADIO_BUTTON, function(button){
      button.style["background-color"] = "#FFF";
  })
} );

excused.addEventListener( "click", function( e ) {
  e.preventDefault();
  excusedBox.style.display = "block";
  correctionBox.style.display = "none";
  excused.style["background-color"] = "#00b300";
  forEachInClass(excusedBox, RADIO_BUTTON, function(button){
      button.style["background-color"] = "#FFF";
  })
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

var setupForms = function( event ) {
  console.log( "DOM content loaded, ready to add forms" );
  //Add click listeners to all buttons in document
  forEachInClass( document, RADIO_BUTTON, function( radio_button ) {
    radio_button.addEventListener( 'click', function( event ) {
      event.preventDefault();
      //When this button is clicked
      //Delete all other "clicked" classes
      if ( this.id == "lateness-excuse" || this.id == "lateness-correction" || this.id == "cuts" ) {
        forEachInClass( document, "checkbox-label", function( checkbox ) {
          checkbox.classList.remove( "checkbox-hidden" );
        } );
      } else {
        forEachInClass( document, "checkbox-label", function( checkbox ) {
          checkbox.classList.add( "checkbox-hidden" );
        } );
      }
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
      }
      //Add the "clicked" class to this button
      this.classList.add( 'clicked' );
    } );
  } );
  forEachInClass( document, ABSENCE_FORM_CLASS, function( form ) {
    form.onsubmit = form.onsubmit || function( event ) {
      event.preventDefault();
    };
    //Create function to submit absence note form

    //Create function to create PDF of absence note
    //Will be assigned to Print PDF button, not called yet
    var submitForm = function( event ) {
      event.preventDefault();
      var formdata = getData( form );
      //If one of the inputs is blank, that's no good
      if ( formdata.error ) {
        return;
      }
      console.log( "form is filled" );
      //Otherwise, ok to send input data to the server
      submit( form, {
        url: '/student/absence/create',
        method: 'POST',
        data: formdata,
        success: function( res ) {
          res = JSON.parse( res );
          console.log( res );
          if ( res.success ) {
            window.location = '/student/history';
            return;
          } else {
            console.log( "response unsuccessful" );
            forEachInClass( form, ABSENCE_FORM_CLASS, function( element ) {
              element.innerHTML = res;
            } );
          }
        },
        complete: function() {}
      }, ERROR_MESSAGE );
    };
    forEachInClass( form, SUBMIT_BUTTON, function( submit ) {
      submit.addEventListener( 'click', submitForm );
    } );
  } );
};

//Returns a dictionary of all filled out inputs in the form
var getData = function( form ) {
  var data = {};
  //Get radio button data here - stored in data['type']
  forEachInClass( document, RADIO_BUTTON, function( button ) {
    if ( button.classList.contains( 'clicked' ) ) {
      data.excused = button.id;
    }
  } );
  //Get the standalone entries in the form
  forEachInClass( form, FORM_ENTRIES, function( entry ) {
    forEachInClass( entry, TEXT_INPUT, function( input ) {
      //Make sure inputs aren't empty
      if ( input.value === '' ) {
        var error_div = document.getElementById( 'error' );
        error_div.innerHTML = "Required fields missing";
        window.location = '#error';
        data.error = true;
        return;
      }
      data[ input.name ] = input.value;
    } );
    forEachInClass( entry, EXPLANATION_INPUT, function( input ) {
      //Nothing empty for you
      if ( input.value === '' ) {
        var error_div = document.getElementById( 'error' );
        error_div.innerHTML = "Required fields missing";
        window.location = '#error';
        data.error = true;
        return;
      }
      data[ input.name ] = input.value;
    } );
  } );
  //Get the teachers and periods
  data.periods = [];
  forEachInClass( form, PERIOD_CHECKBOX, function( box ) {
    if ( box.checked ) {
      data.periods.push( true );
      forEachInClass( box.parentNode.parentNode, TEXT_INPUT, function( input ) {
        //Please have filled in inputs
        if ( !( input.value ) ) {
          var error_div = document.getElementById( 'error' );
          error_div.innerHTML = "Required fields missing";
          window.location = '#error';
          data.error = true;
          return;
        }
        data[ input.name ] = input.value;
      } );
    } else {
      data.periods.push( false );
    }
  } );
  console.log( data );
  return data;
};

document.addEventListener( 'DOMContentLoaded', setupForms );

var TABLE_PERIODS = "table-period";

forEachInClass( document, TABLE_PERIODS, function( period ) {
  var checkbox = period.childNodes[ 1 ].childNodes[ 1 ];
  if ( !checkbox.checked ) {
    period.classList.add( "unchecked" );
  }
  checkbox.addEventListener( "click", function( e ) {
    if ( checkbox.checked ) {
      period.classList.remove( "unchecked" );
    } else {
      period.classList.add( "unchecked" );
    }
  } );
} );