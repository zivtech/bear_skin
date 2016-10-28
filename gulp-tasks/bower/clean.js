'use strict';

var clean = require('gulp-clean');

module.exports = function(gulp, options) {
  return gulp.src([
      'components/vendor/bower/css',
      'components/vendor/bower/images',
      'components/vendor/bower/js',
      'components/vendor/bower/fonts',
      'components/vendor/bower/bower.yml'
    ], {read: false})
    .pipe(clean({force: true}));
};