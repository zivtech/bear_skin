'use strict';

var favicons = require('gulp-favicons');
var log = require('fancy-log');

module.exports = function (gulp) {
  return gulp.src(global.OPTIONS.favicons.src)
    .pipe(favicons({
      appName: global.OPTIONS.theme.name,
      appDescription: global.OPTIONS.theme.name,
      background: global.OPTIONS.favicons.bgColor,
      path: '/themes/' + global.OPTIONS.theme.name + '/' + global.OPTIONS.favicons.dest,
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
    .on('error', log.error)
    .pipe(gulp.dest(global.OPTIONS.favicons.dest));
};
