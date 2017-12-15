import gulp from 'gulp';
import gbabel from 'gulp-babel';
import gclean from 'gulp-clean';
import guglify from 'gulp-uglify';
import grename from 'gulp-rename';
import gsourcemaps from 'gulp-sourcemaps';
import gwebpack from 'webpack-stream';
import distJsWebpack from './webpack.distJs.config.babel';

gulp.task('default', ['distJs', 'lib'], () => {});

gulp.task('distJs', ['distJsClean'], () => {
  gulp.start('distJsBuild');
});
gulp.task('distJsBuild', () => {
  return gulp.src('src/sk.js')
    .pipe(gwebpack(distJsWebpack))
    .pipe(gulp.dest('dist/'))
    .pipe(gsourcemaps.init())
    .pipe(grename({suffix: '.min'}))
    .pipe(guglify())
    .pipe(gsourcemaps.write('./'))
    .pipe(gulp.dest('dist/'));
});
gulp.task('distJsClean', () => {
  return gulp.src(['dist'], {read: false})
    .pipe(gclean());
});

gulp.task('lib', ['libClean'], () => {
  gulp.start('libBuild');
});
gulp.task('libBuild', () => {
  return gulp.src('src/**/*.js')
    .pipe(gbabel({
      'presets': [
        'es2015',
        'stage-0',
        'stage-1',
        'stage-2',
        'stage-3'
      ],
      'plugins': [
        'add-module-exports'
      ],
      'sourceMaps': 'both'
    }))
    .pipe(gulp.dest('lib'));
});
gulp.task('libClean', () => {
  return gulp.src(['lib'], {read: false})
    .pipe(gclean());
});
