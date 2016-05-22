/**
 * Returns the callback with every element matching the classname in the parent
 * @param  {Object}   parent    DOM Object
 * @param  {String}   classname
 * @param  {Function} callback  calls with the item being pulled
 */
var forEachInClass = function(parent, classname, callback) {
  console.log(parent);
  Array.from(parent.getElementsByClassName(classname)).forEach(callback);
};
/**
 * Same as above but with tag names
 * @param  {Object}   parent   DOM Parent Object
 * @param  {String}   tag
 * @param  {Function} callback Calls on item pulled
 */
var forEachInTags = function(parent, tag, callback) {
  Array.from(parent.getElementsByTagName(tag)).forEach(callback);
};
