'use strict';

var del = require('del');
var imagemin = require('gulp-imagemin');

module.exports = function (gulp, options) {
  return gulp.src(options.images.src)
    .pipe(imagemin({
      verbose: true
    }))
    .pipe(gulp.dest(options.images.dest));
};