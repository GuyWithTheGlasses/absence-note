var ABSENCE_FORM_CLASS = 'absence-form';
var SUBMIT_BUTTON = 'form-submit-ajax';
var PDF_BUTTON = 'form-create-pdf';
var ERROR_MESSAGE = 'error-message';

var setupForms = function(event){
  forEachInClass(document, ABSENCE_FORM_CLASS, function(form){
    form.onsubmit = form.onsubmit || function(event){event.preventDefault();};

      var submitForm = function(event){
      submit(form, {
        url:'/students/absencenote',
        method:'POST',
	data:getData(form),
        success:function(res){
          res = JSON.parse(res);
          if(res.success) return window.location.href = '/student/absencenote/' + res.note_id;
          else {
            forEachInClass(form, ABSENCE_FORM_CLASS, function(element){
              element.innerHTML = res;
            });
          }
        },
        complete:function(){
        }
      }, ERROR_MESSAGE);
    };
    forEachInClass(form, SUBMIT_BUTTON, function(button){
	button.addEventListener('click', submitForm);
    });
    forEachInClass(form, PDF_BUTTON, function(button){
	button.addEventListener('click', getData);
    });
  });
};

var getData = function(form){
    var dict = {};
    //What kind of note is it?
    forEachInClass(form, excused, function(radio){
	if(){
	    dict{radio.name: /*actual text*/};
	}

		   //Get data of teachers and periods 
		   forEachInClass(form, checkbox, function(box){
	if(box/*is checked*/){
	    forEachInClass(box.parent.parent, input, function(text){
		dict{text.name: /*actual text*/};
	    }
	} 
    }
    return dict;
};

document.addEventListener('DOMContentLoaded', setupForms);
