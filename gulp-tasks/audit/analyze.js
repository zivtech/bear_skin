var parker = require('gulp-parker');
var core = require('../core.js');

module.exports = function (gulp, options) {
  core.checkResultsDir();
  return gulp.src(options.css.dest + '/*.css')
	.pipe(parker({
    file: 'audit-results/css-analysis.md'
  }));
}
