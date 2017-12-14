'use strict';

var sourcemaps = require('gulp-sourcemaps');
var flexibility = require('postcss-flexibility');
var postcss = require('gulp-postcss');
var cssnext = require('cssnext');
var cached = require('gulp-cached');
var mqpacker = require('css-mqpacker');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var flatten = require('gulp-flatten');
var gulpif = require('gulp-if');
var browserSync = require('browser-sync');

module.exports = function (gulp, options) {

  var processors = [
    cssnext({
      'browsers': [options.css.browsers],
      'compress': true
    }),
    mqpacker({sort: true}),
    flexibility()
  ];

  return gulp.src(options.css.src)
    .pipe(plumber({
      errorHandler: function (error) {
        notify.onError({
          title: 'CSS <%= error.name %> - Line <%= error.line %>',
          message: '<%= error.message %>'
        })(error);
        this.emit('end');
      }
    }))
    .pipe(gulpif(options.buildSourceMaps, sourcemaps.init({debug: true})))
    .on('error', sass.logError)
    .pipe(gulpif(options.buildSourceMaps, sourcemaps.write()))
    .pipe(postcss(processors))
    .pipe(flatten())
    .pipe(gulp.dest(options.css.dest))
    .pipe(gulpif(options.browserSync.patterns.enabled, browserSync.get('patterns').stream({match: '**/*.css'})))
    .pipe(gulpif(options.browserSync.site.enabled, browserSync.get('site').stream({match: '**/*.css'})));
};
