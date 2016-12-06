'use strict';

var concat = require('gulp-concat');
var webFontsBase64 = require('gulp-google-fonts-base64-css');

module.exports = function (gulp, options) {
  return gulp.src('./fonts.list')
    .pipe(webFontsBase64())
    .pipe(concat('fonts.css'))
    .pipe(gulp.dest(options.fonts.dest));
};