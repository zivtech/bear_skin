'use strict';

var sourcemaps = require('gulp-sourcemaps');
var flexibility = require('postcss-flexibility');
var postcss = require('gulp-postcss');
var cssnext = require('postcss-cssnext');
var concatCss = require('gulp-concat-css');
var mqpacker = require('css-mqpacker');
var pump = require('pump');
var notify = require('gulp-notify');
var gulpif = require('gulp-if');
var browserSync = require('browser-sync');
var cssInfo = require('gulp-css-info');

module.exports = function (gulp, options, cb) {

  var processors = [
    require('postcss-import')(),
    require('postcss-discard-comments')(),
    require('postcss-cssnext')({
      browsers: options.css.browsers,
      features: {
        customProperties: {
          variables: options.css.customProperties,
          preserve: true,
        },
        customMedia: {
          extensions: options.css.mediaQueries,
        },
      }
    }),
    mqpacker({
      sort: true
    }),
    flexibility()
  ];

  return pump([
    gulp.src(options.css.src),
    gulpif(options.buildSourceMaps, sourcemaps.init({debug: true})),
    postcss(processors),
    concatCss('theme.css'),
    gulpif(options.buildSourceMaps, sourcemaps.write()),
    gulp.dest(options.css.dest),
    cssInfo(),
    gulp.dest('docs'),
    gulpif(options.browserSync.patterns.enabled, browserSync.get('patterns').stream({match: '**/*.css'})),
    gulpif(options.browserSync.site.enabled, browserSync.get('site').stream({match: '**/*.css'})),
  ], cb);
};
