var ABSENCE_FORM_CLASS = 'absence-form';
var SUBMIT_BUTTON = 'form-submit-ajax';
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
  });
};


var getData = function(form){
    return;
};

document.addEventListener('DOMContentLoaded', setupForms);
