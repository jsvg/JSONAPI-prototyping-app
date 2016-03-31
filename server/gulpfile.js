'use strict';

var gulp = require('gulp'),
    nodemon = require('gulp-nodemon'),
    livereload = require('gulp-livereload');

gulp.task('default', ['nodemon'], function () {});

gulp.task('nodemon', function(cb) {
  var started = false;
  livereload.listen();
  return nodemon({
    script: 'api/server.js',
    }).on('start', function() {
      if (!started) {
        cb();
        started = true;
      }
    }).on('restart', function(){
      setTimeout(function() {
        gulp.src('api/server.js')
          .pipe(livereload())
      }, 1000);
    });
});
