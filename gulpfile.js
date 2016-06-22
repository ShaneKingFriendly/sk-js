var gulp = require('gulp'),
  clean = require('gulp-clean'),
  rename = require('gulp-rename'),
  uglify = require('gulp-uglify'),
  sourcemaps = require('gulp-sourcemaps');

gulp.task('clean', function () {
  return gulp.src(['dist'], {read: false})
    .pipe(clean());
});

gulp.task('scripts', function () {
  return gulp.src('src/*.js')
    .pipe(gulp.dest('dist/'))
    .pipe(sourcemaps.init())
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('dist/'));
});

gulp.task('default', ['clean'], function () {
  gulp.start('scripts');
});
