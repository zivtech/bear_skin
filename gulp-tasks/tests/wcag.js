var postcss = require('gulp-postcss');
var postscss = require('postcss-scss');
var wcag = require('postcss-wcag-contrast');

module.exports = function (gulp, options) {
	return gulp.src(options.css.src)
	.pipe(postcss([
		wcag({
			compliance: options.css.wcagCompliance
		})
	], {syntax: postscss}))
	.pipe(gulp.dest('.'));
};
