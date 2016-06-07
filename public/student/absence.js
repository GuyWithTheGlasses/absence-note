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

var setupForms = function(event) {
  forEachInClass(document, ABSENCE_FORM_CLASS, function(form) {
    form.onsubmit = form.onsubmit || function(event) {
      event.preventDefault();
    };
    //Create function to submit form data to database
    var submitForm = function(event) {
      //Send input data to the server
      submit(form, {
        url: '/students/absencenote',
        method: 'POST',
        data: getData(form),
        success: function(res) {
          res = JSON.parse(res);
          if (res.success) return window.location.href = '/student/absencenote/' + res.note_id;
          //res.note contains the all the student's necessary data
          //Use this to generate a pdf of the absence note
          else {
            forEachInClass(form, ABSENCE_FORM_CLASS, function(element) {
              element.innerHTML = res;
            });
          }
        },
        complete: function() {}
      }, ERROR_MESSAGE);
    };
    forEachInClass(form, SUBMIT_BUTTON, function(button) {
      button.addEventListener('click', submitForm);
    });
  });
};

//Returns a dictionary of all filled out inputs in the form
var getData = function(form) {
  var data = {};
  //Get radio button data here - stored in data['type']
  forEachInClass(form, RADIO_BUTTON_DIV, function(button-box){
      forEachInClass(button-box, 'clicked', function(button){
	  data['type'] = button.name;
      })
  }); 
  //Get the standalone entries in the form
  forEachInClass(form, FORM_ENTRIES, function(entry) {
    forEachInClass(entry, TEXT_INPUT, function(input) {
      data[input.name] = input.value;
    })
    forEachInClass(entry, EXPLANATION_INPUT, function(input) {
      data[input.name] = input.value;
    })
  });
  //Get the teachers and periods 
  forEachInClass(form, PERIOD_CHECKBOX, function(box) {
    if (box.checked) {
      forEachInClass(box.parentNode.parentNode, TEXT_INPUT, function(input) {
        data[input.name] = input.value;
      })
    }
  })
  return data;
};

//Add event listeners to all "radio buttons" to determine which is clicked
var findClicked = function(form){
    forEachInClass(form, RADIO_BUTTON, function(radio-button){
	radio-button.addEventListener('click', function(){
	    //Delete all other "clicked" classes
	    forEachInTags(form, 'button', function(button){
		button.classList.remove('clicked');
	    })
	    //Add the "clicked" class to this button
	    this.classList.add('clicked');
	})
    })
};

document.addEventListener('DOMContentLoaded', setupForms);
