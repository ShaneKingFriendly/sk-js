import gulp from 'gulp';
import gbabel from 'gulp-babel';
import gclean from 'gulp-clean';

gulp.task('clean', () => {
  return gulp.src(['lib'], {read: false})
    .pipe(gclean());
});
gulp.task('build', () => {
  return gulp.src('src/**/*.js')
    .pipe(gbabel())
    .pipe(gulp.dest('lib'));
});
gulp.task('default', ['clean'], () => {
  gulp.start('build');
});
