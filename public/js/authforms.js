var LOGIN_FORM_CLASS = "login-form";
var REGISTER_FORM_CLASS = "register-form";
var FORM_SUBMIT = "form-submit-ajax";
var LOGIN_MESSAGE = "login-message";
var REGISTER_MESSAGE = "register-message";

/**
 * Initializes all login and register forms in the DOM
 */
var setupForms = function( e ) {

  //Setup Login Form
  forEachInClass( document, LOGIN_FORM_CLASS, function( form ) {
    form.onsubmit = form.onsubmit || function( event ) {
      event.preventDefault();
    };
    var submitForm = function( e ) {
      submit( form, {
        "url": "/login",
        "method": "POST",
        success: success( form, LOGIN_MESSAGE ),
        complete: function() {}
      }, LOGIN_MESSAGE );
    };
    forEachInClass( form, FORM_SUBMIT, function( element ) {
      element.addEventListener( 'click', submitForm );
    } );
  } );

  //Setup Register form
  forEachInClass( document, REGISTER_FORM_CLASS, function( form ) {
    form.onsubmit = form.onsubmit || function( event ) {
      event.preventDefault();
    };
    var submitForm = function( e ) {
      submit( form, {
        "url": "/register",
        "method": "POST",
        success: success( form, REGISTER_MESSAGE ),
        complete: function() {
          console.log( "Registered!" );
        }
      }, REGISTER_MESSAGE );
    };
    forEachInClass( form, FORM_SUBMIT, function( element ) {
      element.addEventListener( 'click', submitForm );
    } );
  } );
};

document.addEventListener( "DOMContentLoaded", setupForms );
