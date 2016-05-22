/**
 * Asynchronous javascript and xmlhttprequest
 * @param  {Object} options all options set on server should work!
 * You should callback using success(done) or others. Will callback with
 * response object
 */
var ajax = function(options) {
  var request = new XMLHttpRequest();
  request.onload = function() {
    return options.success && options.success(request.response);
  };
  request.onloadend = function() {
    return options.complete && options.complete();
  };
  request.open(options.method || 'POST', options.url || window.location.href);
  request.setRequestHeader('Content-Type',
    options.contentType || 'application/json; charset=UTF-8');
  var data = JSON.stringify(options.data);
  console.log(data);
  request.send(JSON.stringify(options.data));
};

/**
 * Checks input fields client side to make sure all are filled output
 * @param  {Object} form   DOM form Object
 * @param  {Object} output DOM object to append error message to
 * @return {boolean} whether or not an error was detected(i.e. an empty field);
 */
var checkInputs = function(form, output) {
  var clean = true;
  forEachInTags(form, 'INPUT', function(input) {
    if (input.value === "" && input.getAttribute('type') != 'submit') {
      forEachInClass(form, output, function(element) {
        element.innerHTML = element.innerHTML || "Missing required fields:<br>";
        element.innerHTML += input.getAttribute('name') + "<br>";
      });
      clean = false;
    }
  });
  return clean;
};

/**
 * Submits the form provided with the specified ajax
 * @param  {Object} form     DOM form
 * @param  {Object} ajaxOpts DIctionary of ajax options
 * @param {String} messageLoc Class of all elements to display the return message
 */
var submit = function(form, ajaxOpts, messageLoc) {
  var data = {};
  var clean = true;
  forEachInTags(form, 'INPUT', function(input) {
    data[input.getAttribute('name')] = input.value;
  });
  if (checkInputs(form, messageLoc)) {
    ajaxOpts.data = data;
    ajax(ajaxOpts);
  }
};

/**
 * called upon success of ajax request
 * @param  {String} messageLoc where to output error messages
 * @param  {Object} form       Dom Form object
 * @return {Function}          method called with res object, customized to
 *  output to message field
 */
var success = function( form, messageLoc) {
  var successMethod = function(res) {
    res = JSON.parse(res);
    console.log(res);
    if (res.success) {
      window.location.href = res.redirect || '/';
      return;
    }
    if (res.message) {
      forEachInClass(form, messageLoc, function(element) {
        element.innerHTML = res.message + "<br>";
      });
    }
  };
  return successMethod;
};
