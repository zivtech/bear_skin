'use strict';

var replace = require('gulp-replace');
var shell = require('gulp-shell');

module.exports = function (gulp, options) {

  process.env.name = options.theme.name;

  gulp.task('rename:files', shell.task([
    'npm run renamer -- --regex --find=bear_skin --replace="<%= process.env.name %>" * "config/**" "components/**" "css/**" "js/**" "templates/**" --verbose'
  ]));

  gulp.task('rename:strings', function() {
    return gulp.src(['**', '!node_modules', '!node_modules/**', '!fonts/*', '!.git', '!**/*.png', '!**/*.ico', '!**/*.gif', '!images/**/*'])
      .pipe(replace('bear_skin', options.theme.name))
      .pipe(gulp.dest('.'));
  });
}
