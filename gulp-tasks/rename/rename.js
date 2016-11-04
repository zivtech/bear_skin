'use strict';

var replace = require('gulp-replace');
var shell = require('gulp-shell');

module.exports = function (gulp, options) {

  return gulp.src('*')
    //.pipe(replace('bearskin8pl', 'poop'))
    //.pipe(gulp.dest('.'));
    .pipe(shell([
      'npm run rename-files'
    ]));
};
