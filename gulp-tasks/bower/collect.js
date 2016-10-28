'use strict';

var flatten = require('gulp-flatten');
var filter = require('gulp-filter');
var cssUrls = require('gulp-css-urls');
var mainBowerFiles = require('main-bower-files');
var gutil = require('gulp-util');

module.exports = function (gulp, options) {
  var files = mainBowerFiles();
  var jsFilter = filter('**/*.js', {restore: true});
  var cssFilter = filter('**/*.css', {restore: true});
  var imageFilter = filter(['**/*.jpg', '**/*.jpeg', '**/*.gif', '**/*.png'], {restore: true});
  var fontFilter = filter(['**/*.eot', '**/*.woff', '**/*.woff2', '**/*.otf', '**/*.ttf'], {restore: true});

  return gulp.src(files)

    // grab vendor js files from bower components
    .pipe(jsFilter)
    .pipe(gulp.dest(options.bower.dest + '/js'))
    .pipe(jsFilter.restore)

    // grab vendor css files from bower components
    .pipe(cssFilter)
    .pipe(cssUrls(function (url) {
      // rewrite the path of any url() in the css to match new path
      var fileParts = url.split('/');
      var file = fileParts[fileParts.length - 1];

      if (file.match(/(png|jpg|jpeg|gif)/)) {
        return '../images/' + file;
      }

      if (file.match(/(eot|woff|woff2|otf|ttf)/)) {
        return '../fonts/' + file;
      }
    }))
    .pipe(gulp.dest(options.bower.dest + '/css'))
    .pipe(cssFilter.restore)

    // grab vendor images files from bower components
    .pipe(imageFilter)
    .pipe(gulp.dest(options.bower.dest + '/images'))
    .pipe(imageFilter.restore)

    // grab vendor font files from bower components
    .pipe(fontFilter)
    .pipe(flatten())
    .pipe(gulp.dest(options.bower.dest + '/fonts'))
    .pipe(fontFilter.restore);
};