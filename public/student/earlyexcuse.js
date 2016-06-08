var ABSENCE_FORM_CLASS = 'absence-form';
var SUBMIT_BUTTON = 'form-submit-ajax';
var PDF_BUTTON = 'form-create-pdf';
var TEXT_INPUT = 'input';
var EXPLANATION_INPUT = 'explanation';
var PERIOD_CHECKBOX = 'checkbox';
var FORM_ENTRIES = 'form-entry';
var ERROR_MESSAGE = 'error-message';
var RADIO_BUTTON_DIV = 'type-box';
var RADIO_BUTTON = 'excusemestopreading';

var setupForms = function(event) {
  forEachInClass(document, ABSENCE_FORM_CLASS, function(form) {
    form.onsubmit = form.onsubmit || function(event) {
      event.preventDefault();
    };
    //Add click listeners to all buttons in form
    forEachInClass(form, RADIO_BUTTON, function(radio-button){
	radio-button.addEventListener('click', function(){
	    //When this button is clicked
	    //Delete all other "clicked" classes
	    forEachInTags(form, 'button', function(button){
		button.classList.remove('clicked');
	    })
	    //Add the "clicked" class to this button
	    this.classList.add('clicked');
	})
    });
    //Create function to submit form data to database
    //Will be assigned to submit button, not called yet
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

var getData = function(form) {
  var data = {};
  //Get radio button data here - stored in data['type']
  forEachInClass(form, RADIO_BUTTON_DIV, function(button-box){
      forEachInClass(button-box, 'clicked', function(button){
	  data['type'] = button.id;
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
