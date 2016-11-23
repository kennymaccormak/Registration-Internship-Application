"use strict";

const gulp = require('gulp');
const debug = require('gulp-debug');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const del = require('del');
const newer = require('gulp-newer');
const browserSync = require('browser-sync').create();

gulp.task('sass', function() {
  return gulp.src('frontend/sass/main.scss')
    .pipe(sass())
    .pipe(gulp.dest('public'));
});

gulp.task('bs-js', function() {
  return gulp.src('bootstrap/javascripts/bootstrap.min.js')
    //.pipe(sass())
    .pipe(gulp.dest('public'));
});

gulp.task('clean', function() {
  return del('public');
});

gulp.task('assets', function() {
  return gulp.src('frontend/assets/**', {since: gulp.lastRun('assets')})
    .pipe(newer('public'))
    .pipe(debug({title: 'assets'}))
    .pipe(gulp.dest('public'));
});

gulp.task('build', gulp.series(
  'clean',
  gulp.parallel('sass', 'assets'))
);

gulp.task('watch', function() {
  gulp.watch('frontend/assets/**/*.*', gulp.series('assets'));
  gulp.watch('frontend/sass/**/*.*', gulp.series('sass'));
})

gulp.task('serve', function() {
  browserSync.init({
    server: 'public'
  });

  browserSync.watch('public/**/*.*').on('change', browserSync.reload);
});

gulp.task('dev', gulp.series('clean', 'build', gulp.parallel('watch', 'serve')));
