'use strict';

var eslint = require('gulp-eslint');

module.exports = function (gulp, options) {
  var source = options.js.src;
  source.push('!js/vendor/*');
  source.push('!js/*.min.js');

  if (options.js.lint.enabled) {
    return gulp.src(source)
      .pipe(eslint({
        useEslintrc: true
      }))
      .pipe(eslint.format());
  }
  return console.log('linting not enabled');
};