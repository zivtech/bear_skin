'use strict';

var csslint = require('gulp-csslint');

module.exports = function (gulp, options) {
  return gulp.src([options.css.dest + '/**/*.css', options.ui.dest + '/**/*.css'])
    .pipe(csslint('.csslintrc'))
    .pipe(csslint.formatter());
};