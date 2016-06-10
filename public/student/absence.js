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

var setupForms = function( event ) {
  console.log( "DOM content loaded, ready to add forms" );
  forEachInClass( document, ABSENCE_FORM_CLASS, function( form ) {
    form.onsubmit = form.onsubmit || function( event ) {
      event.preventDefault();
    }; 
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
    //Create function to create PDF of absence note
    //Will be assigned to Print PDF button, not called yet
    var createPDF = function( event ) {
      console.log("creating PDF");
      //Send input data to the server
      var formdata = getData(form);
      submit( form, {
        url: '/students/absencenote',
        method: 'POST',
        data: formdata,
        success: function( res ) {
          res = JSON.parse( res );
          if ( res.success ) {
            formdata['name'] = res.note.student;
            formdata['OSIS'] = res.note.OSIS;
            createAbsencePDF(formdata);
            return window.location.href + '/student/';
          }
          else {
            forEachInClass( form, ABSENCE_FORM_CLASS, function( element ) {
              element.innerHTML = res;
            } );
          }
        },
        complete: function() {}
      }, ERROR_MESSAGE );
    };
    forEachInClass( form, SUBMIT_BUTTON, function( submit ) {
      submit.addEventListener( 'click', function(){ return; } );
    } );
    forEachInClass( form, PDF_BUTTON, function( pdf ){
      pdf.addEventListener( 'click', createPDF );
    } );
  } );
};

//Returns a dictionary of all filled out inputs in the form
var getData = function( form ) {
  var data = {};
  //Get radio button data here - stored in data['type']
  forEachInClass( form, RADIO_BUTTON_DIV, function( button_box ) {
    forEachInClass( button_box, 'clicked', function( button ) {
      date.type = button.id;
    } );
  } );
  //Get the standalone entries in the form
  forEachInClass( form, FORM_ENTRIES, function( entry ) {
    forEachInClass( entry, TEXT_INPUT, function( input ) {
      data[ input.name ] = input.value;
    } );
    forEachInClass( entry, EXPLANATION_INPUT, function( input ) {
      data[ input.name ] = input.value;
    } );
  } );
  //Get the teachers and periods
  forEachInClass( form, PERIOD_CHECKBOX, function( box ) {
    if ( box.checked ) {
      data[ box.name ] = true;
      forEachInClass( box.parentNode.parentNode, TEXT_INPUT, function( input ) {
        data[ input.name ] = input.value;
      } );
    } else {
      data[ box.name ] = false;
    }
  } );
  return data;
};

document.addEventListener( 'DOMContentLoaded', setupForms );
