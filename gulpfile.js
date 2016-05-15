var config = require('./config/gulp');

var gulp = require('gulp');


gulp.task('default', ['nodemon']);

var nodemon = require('gulp-nodemon');
gulp.task('nodemon', function() {
  return nodemon(config.nodemon);
});
