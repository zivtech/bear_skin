var parker = require('gulp-parker');

module.exports = function (gulp, options) {
  return gulp.src(options.css.dest + '/*.css')
	.pipe(parker({
    file: 'audit-results/css-analysis.md'
  }));
}
