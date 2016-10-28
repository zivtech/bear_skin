'use strict';

var favicons = require('gulp-favicons');
var gutil = require('gulp-util');

module.exports = function (gulp, options) {
  return gulp.src(options.favicons.src)
    .pipe(favicons({
      appName: options.themeName,
      appDescription: options.themeName,
      background: options.favicons.bgColor,
      path: '/themes/' + options.themeName + '/' + options.favicons.dest,
      display: 'standalone',
      orientation: 'portrait',
      start_url: '/?homescreen=1',
      version: 1.0,
      logging: false,
      online: false,
      html: 'icons.html',
      pipeHTML: true,
      replace: true,
      icons: {
        android: true,
        appleIcon: true,
        appleStartup: false,
        coast: false,
        favicons: true,
        firefox: true,
        windows: false,
        yandex: false
      }
    }))
    .on('error', gutil.log)
    .pipe(gulp.dest(options.favicons.dest));
};
