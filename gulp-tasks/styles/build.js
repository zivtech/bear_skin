'use strict';

var sourcemaps = require('gulp-sourcemaps');
var flexibility = require('postcss-flexibility');
var postcss = require('gulp-postcss');
var cssnext = require('postcss-cssnext');
var corepostcss = require('postcss');
var cached = require('gulp-cached');
var concatCss = require('gulp-concat-css');
var mqpacker = require('css-mqpacker');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var gulpif = require('gulp-if');
var browserSync = require('browser-sync');

var categories = require('../../theme-settings.json');
var styleVariables = require('../../components/_patterns/00-utilities/_variables/variables');
// var mediaQueries = require("./src/mediaQueries");

var dataloop = function(css) {
  var rule ='';
  for (var category in categories.colorList) {
    var colorSet = categories.colorList[category];
    var color = colorSet[0];
    rule = corepostcss.rule({ selector: '.' + category });
    rule.append({ prop: 'color', value: color});
    css.append(rule);
  }
  for (var category in categories.bgList) {
    var bgSet = categories.bgList[category];
    var bgColor = bgSet[0];
    rule = corepostcss.rule({ selector: '.' + category });
    rule.append({ prop: 'background-color', value: bgColor});
    css.append(rule);
  }
};

module.exports = function (gulp, options) {

  var processors = [
      require('postcss-import'),
      cssnext({
        'browsers': options.css.browsers,
        features: {
          customProperties: {
            variables: styleVariables
          }
          // customMedia: {
          //   extensions: mediaQueries
          // }
        }
      }),
      mqpacker({sort: true}),
      flexibility()
  ];

  var postprocessors = [
    dataloop
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
    .pipe(postcss((processors)))
    .pipe(gulpif(options.buildSourceMaps, sourcemaps.write()))
    .pipe(concatCss('theme.css'))
    .pipe(postcss(postprocessors))
    .pipe(gulp.dest(options.css.dest))
    .pipe(gulpif(options.browserSync.patterns.enabled, browserSync.get('patterns').stream({match: '**/*.css'})))
    .pipe(gulpif(options.browserSync.site.enabled, browserSync.get('site').stream({match: '**/*.css'})));
};
