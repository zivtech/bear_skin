'use strict';

var sourcemaps = require('gulp-sourcemaps');
var flexibility = require('postcss-flexibility');
var postcss = require('gulp-postcss');
var cssnext = require('postcss-cssnext');
var corepostcss = require('postcss');
var concatCss = require('gulp-concat-css');
var mqpacker = require('css-mqpacker');
var pump = require('pump');
var notify = require('gulp-notify');
var gulpif = require('gulp-if');
var browserSync = require('browser-sync');
var cssnano = require('gulp-cssnano');
var cssInfo = require('gulp-css-info');

var mColors = require('../../theme-settings.json');
var bgColors = require('../../theme-settings.json');
var styleVariables = require('../../components/_patterns/00-utilities/_variables/variables');
var mediaQueries = require('../../components/_patterns/00-utilities/_variables/mq');

var dataloop = function (css) {
  var rule = '';
  for (var mColor in mColors.colorList) {
    var colorSet = mColors.colorList[mColor];
    rule = corepostcss.rule({selector: '.' + mColor});
    rule.append({prop: 'color', value: colorSet});
    css.append(rule);
  }
  for (var bgColor in bgColors.bgList) {
    var colorSet = bgColors.bgList[bgColor];
    rule = corepostcss.rule({selector: '.' + bgColor});
    rule.append({prop: 'background-color', value: colorSet});
    css.append(rule);
  }
};

module.exports = function (gulp, options, cb) {

  var processors = [
    require('postcss-import'),
    cssnext({
      'browsers': options.css.browsers,
      features: {
        customProperties: {
          variables: styleVariables
        },
        customMedia: {
          extensions: mediaQueries
        }
      }
    }),
    mqpacker({sort: true}),
    flexibility()
  ];

  var postprocessors = [
    dataloop
  ];

  return pump([
    gulp.src(options.css.src),
    gulpif(options.buildSourceMaps, sourcemaps.init({debug: true})),
    postcss(processors),
    gulpif(options.buildSourceMaps, sourcemaps.write()),
    concatCss('theme.css'),
    postcss(postprocessors),
    cssnano({
      autoprefixer: false,
      reduceIdents: {
        keyframes: false
      },
      discardUnused: {
        keyframes: false
      }
    }),
    gulp.dest(options.css.dest),
    cssInfo(),
    gulp.dest('docs'),
    gulpif(options.browserSync.patterns.enabled, browserSync.get('patterns').stream({match: '**/*.css'})),
    gulpif(options.browserSync.site.enabled, browserSync.get('site').stream({match: '**/*.css'})),
  ], cb);
};
