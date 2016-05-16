var config = require('./config/gulp');

var gulp = require('gulp');

gulp.task('default');



gulp.task('watch', ['nodemon', 'sass:watch']);

var nodemon = require('gulp-nodemon');
gulp.task('nodemon', function() {
  return nodemon(config.nodemon);
});

var sass = require('gulp-sass');
gulp.task('sass', function() {
  return gulp.src(config.sass.src)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(config.sass.dest));
});
gulp.task('sass:watch', function() {
  gulp.watch(config.sass.src, ['sass']);
});
