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

var correctionBox = document.getElementById("correction-box");
var excusedBox = document.getElementById("excused-box");
var masterBox = document.getElementById("master-box");

var correction = document.getElementById("correction");
var excused = document.getElementById("excused");

correction.addEventListener("click", function(e) {
  e.preventDefault();
  correctionBox.style.display = "block";
  excusedBox.style.display = "none";
});

excused.addEventListener("click", function(e) {
  e.preventDefault();
  excusedBox.style.display = "block";
  correctionBox.style.display = "none";
});

var picker = new Pikaday( {
  field: document.getElementById( 'excused-date' ),
  disableWeekends: true
} );

var calendar = document.getElementById( "calendar-button" );

calendar.addEventListener( "click", function( e ) {
  e.preventDefault();
  picker.show();
} );

var setupForms = function(event) {
  console.log("DOM content loaded, ready to add forms");
  //Add click listeners to all buttons in document
  forEachInClass(document, RADIO_BUTTON, function(radio_button) {
    radio_button.addEventListener('click', function(event) {
      event.preventDefault();
      //When this button is clicked
      //Delete all other "clicked" classes
      if (this.id != "excused" && this.id != "correction") {
        forEachInClass(document, RADIO_BUTTON, function(radio_button) {
          if (radio_button.id != "excused" && radio_button.id != "correction") {
            radio_button.classList.remove('clicked');
          }
        });
      } else {
        forEachInClass(document, RADIO_BUTTON, function(radio_button) {
          radio_button.classList.remove('clicked');
        });
      }
      //Add the "clicked" class to this button
      this.classList.add('clicked');
    });
  });
  forEachInClass(document, ABSENCE_FORM_CLASS, function(form) {
    form.onsubmit = form.onsubmit || function(event) {
      event.preventDefault();
    };
    //Create function to submit absence note form
    //Will be assigned to Submit button, not called yet
    var createPDF = function(event){
        return;
    }
    //Create function to create PDF of absence note
    //Will be assigned to Print PDF button, not called yet
    var submitForm = function(event) {
      event.preventDefault();
      var formdata = getData(form);
      //If one of the inputs is blank, that's no good
      if(formdata.error){
          return;
      }
      //Otherwise, ok to send input data to the server
      submit(form, {
        url: '/student/absence/create',
        method: 'POST',
        data: formdata,
        success: function(res) {
          res = JSON.parse(res);
          console.log(res);
          if (res.success) {
             return window.location = '/student/history';
          } else {
            forEachInClass(form, ABSENCE_FORM_CLASS, function(element) {
              element.innerHTML = res;
            });
          }
        },
        complete: function() {}
      }, ERROR_MESSAGE);
    };
    forEachInClass(form, SUBMIT_BUTTON, function(submit) {
      submit.addEventListener('click', submitForm);
    });
  });
};

//Returns a dictionary of all filled out inputs in the form
var getData = function(form) {
  var data = {};
  //Get radio button data here - stored in data['type']
  forEachInClass(document, RADIO_BUTTON, function(button) {
    if (button.classList.contains('clicked')) {
      data['type'] = button.id;
    }
  });
  //Get the standalone entries in the form
  forEachInClass(form, FORM_ENTRIES, function(entry) {
    forEachInClass(entry, TEXT_INPUT, function(input) {
      //Make sure inputs aren't empty
      if(input.value === ''){
        var error_div = document.getElementById('error');
        error_div.innerHTML = "Required fields missing.";
        window.location = '#error';
        data.error = true; 
        return;
      }
      data[input.name] = input.value;
    });
    forEachInClass(entry, EXPLANATION_INPUT, function(input) {
      //Nothing empty for you
      if(input.value === ''){
        var error_div = document.getElementById('error');
        error_div.innerHTML = "Required fields missing.";
        window.location = '#error';
        data.error = true;
        return;
      }
      data[input.name] = input.value;
    });
  });
  //Get the teachers and periods
  forEachInClass(form, PERIOD_CHECKBOX, function(box) {
    if (box.checked) {
      data[box.name] = true;
      forEachInClass(box.parentNode.parentNode, TEXT_INPUT, function(input) {
        //Please have filled in inputs
        if(input.value === ''){
          var error_div = document.getElementById('error');
          error_div.innerHTML = "Required fields missing.";
          window.location = '#error';
          data.error = true;
          return;
        }
        data[input.name] = input.value;
      });
    } else {
      data[box.name] = false;
    }
  });
  return data;
};

document.addEventListener('DOMContentLoaded', setupForms);
