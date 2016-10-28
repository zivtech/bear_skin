'use strict';

var inject = require('gulp-inject');

module.exports = function (gulp, options) {
  return gulp.src('templates/html.html.twig')
    .pipe(inject(gulp.src('images/favicons/icons.html'), {
      transform: function (filePath, file) {
        return file.contents.toString();
      }
    }))
    .pipe(gulp.dest('templates'));
}
