'use strict';

var csslint = require('gulp-csslint');

module.exports = function (gulp) {
  return gulp.src([global.OPTIONS.css.dest + '/**/*.css'])
    .pipe(csslint('.csslintrc'))
    .pipe(csslint.formatter());
};