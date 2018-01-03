'use strict';

module.exports = function (gulp, options) {
  return gulp.watch(options.css.src, ['styles:build']);
};