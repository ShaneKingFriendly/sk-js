import gulp from 'gulp';
import gclean from 'gulp-clean';
import guglify from 'gulp-uglify';
import grename from 'gulp-rename';
import gsourcemaps from 'gulp-sourcemaps';
import gwebpack from 'webpack-stream';
import distJsWebpack from './webpack.distJs.config.babel';

gulp.task('clean', () => {
  return gulp.src(['dist'], {read: false})
    .pipe(gclean());
});
gulp.task('scripts', () => {
  return gulp.src('src/*.js')
    .pipe(gwebpack(distJsWebpack))
    .pipe(gulp.dest('dist/'))
    .pipe(gsourcemaps.init())
    .pipe(grename({suffix: '.min'}))
    .pipe(guglify())
    .pipe(gsourcemaps.write('./'))
    .pipe(gulp.dest('dist/'));
});
gulp.task('default', ['clean'], () => {
  gulp.start('scripts');
});
