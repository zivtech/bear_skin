'use strict';

var browserSync = require('browser-sync');

module.exports = function (gulp) {
  return gulp.watch(global.OPTIONS.js.src, ['scripts:lint'], function () {
    if (global.OPTIONS.browserSync.patterns.enabled) {
      console.log('patterns reload');
      browserSync.get('patterns').reload();
    }

    if (global.OPTIONS.browserSync.site.enabled) {
      console.log('site reload');
      browserSync.get('site').reload();
    }
  });
};