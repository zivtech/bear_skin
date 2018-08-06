'use strict';

module.exports = function (gulp) {
  return gulp.watch(global.OPTIONS.css.src, ['styles:build']);
};