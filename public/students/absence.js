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
        success:function(res){
          res = JSON.parse(res);
          if(res.success) return genNote(res.note);
          else {
            forEachInClass(form, ABSENCE_FORM_CLASS, function(element){
              element.innerHTML = res;
            });
          }
        },
        complete:function(){
        }
      });
    };
  });
};
