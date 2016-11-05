'use strict';

var replace = require('gulp-replace');
var shell = require('gulp-shell');

module.exports = function (gulp, options) {

  process.env.name = options.theme.name;

  gulp.task('rename:files', shell.task([
    'npm run renamer -- --find=bearskin8pl --replace="<%= process.env.name %>" ./config/install/* --verbose'
  ]));

  gulp.task('rename:strings', function() {
    return gulp.src(['*', '!node_modules'])
      .pipe(replace('bearskin8pl', options.theme.name))
      .pipe(gulp.dest('.'));
  });
}
