'use strict';

var del = require('del');
var imagemin = require('gulp-imagemin');

module.exports = function (gulp) {
  return gulp.src(global.OPTIONS.images.src)
    .pipe(imagemin({
      verbose: true
    }))
    .pipe(gulp.dest(global.OPTIONS.images.dest));
};