var parker = require('gulp-parker');
var core = require('../core.js');

module.exports = function (gulp) {
  core.checkResultsDir();
  return gulp.src(global.OPTIONS.css.dest + '/*.css')
	.pipe(parker({
    file: 'audit-results/css-analysis.md'
  }));
}
