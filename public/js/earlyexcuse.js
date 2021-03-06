var ABSENCE_FORM_CLASS = 'absence-form';
var SUBMIT_BUTTON = 'form-submit-ajax';
var LINE_INPUT = 'input';
var EXPLANATION_INPUT = 'explanation';
var PERIOD_CHECKBOX = 'checkbox';
var FORM_ENTRIES = 'form-entry';
var ERROR_MESSAGE = 'error-message';

var picker = new Pikaday({
  field: document.getElementById('excused-date'),
  disableWeekends: true
});

var calendar = document.getElementById("calendar-button");

calendar.addEventListener("click", function(e) {
  e.preventDefault();
  picker.show();
});

var setupForms = function(event) {
  console.log("DOM content loaded, ready to add forms");
  //Setup form stuff
  forEachInClass(document, ABSENCE_FORM_CLASS, function(form) {
    form.onsubmit = form.onsubmit || function(event) {
      event.preventDefault();
    };
    //Create function to create PDF of absence note
    //Will be assigned to Print PDF button, not called yet
    var createPDF = function(event) {
      return;
    }
    //Create function to submit absence note form
    //Will be assigned to Submit button, not called yet
    var submitForm = function(event) {
      event.preventDefault();
      var formdata = getData(form);
      //If one of the inputs is blank, that's no good
      if (formdata.error) {
        return;
      }
      //Otherwise, ok to send input data to the server
      submit(form, {
        url: '/student/earlyexcuse/create',
        method: 'POST',
        data: formdata,
        success: function(res) {
          res = JSON.parse(res);
          console.log(res);
          if (res.success) {
            window.location = '/student/history';
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
  //Get the standalone entries in the form
  forEachInClass(form, FORM_ENTRIES, function(entry) {
    //Single-line inputs
    forEachInClass(entry, LINE_INPUT, function(input) {
      //Make sure inputs aren't empty
      if (input.value === '') {
        var error_div = document.getElementById('error');
        error_div.innerHTML = "Required fields missing.";
        window.location = '#error';
        data.error = true;
        return;
      }
      data[input.name] = input.value;
    });
    //Paragraph inputs
    forEachInClass(entry, EXPLANATION_INPUT, function(input) {
      //Nothing empty for you
      if (input.value === '') {
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
  data.periods = [];
  forEachInClass(form, PERIOD_CHECKBOX, function(box) {
    if (box.checked) {
      data.periods.push(true);
    } else {
      data.periods.push(false);
    }
  });
  return data;
};

document.addEventListener('DOMContentLoaded', setupForms);

var TABLE_PERIODS = "table-period";

forEachInClass(document, TABLE_PERIODS, function(period) {
  var checkbox = period.childNodes[1].childNodes[1];
  checkbox.addEventListener("click", function(e) {
    if (checkbox.checked) {
      period.classList.remove("unchecked");
    } else {
      period.classList.add("unchecked");
    }
  });
});
