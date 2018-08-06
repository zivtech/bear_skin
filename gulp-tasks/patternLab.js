'use strict';

var core = require('./core.js');
var path = require('path');
var yaml = require('js-yaml');
var fs = require('fs');
var browserSync = require('browser-sync');

module.exports = function (gulp) {
  var plConfig = yaml.safeLoad(
    fs.readFileSync(global.OPTIONS.patternLab.configFile, 'utf8')
  );
  var plRoot = path.join(global.OPTIONS.patternLab.configFile, '../..');
  var plSource = path.join(plRoot, plConfig.sourceDir);
  var plPublic = path.join(plRoot, plConfig.publicDir);
  var plMeta = path.join(plSource, '/_meta');
  var consolePath = path.join(plRoot, 'core/console');
  var watchedExtensions = global.OPTIONS.patternLab.watchedExtensions.join(',');

  function plBuild(cb) {
    core.sh('php ' + consolePath + ' --generate', true, function () {
      if (global.OPTIONS.browserSync.patterns.enabled) {
        browserSync.get('patterns').reload();
      }

      if (global.OPTIONS.browserSync.site.enabled) {
        browserSync.get('site').reload();
      }

      cb();
    });
  }

  gulp.task('pl:build', plBuild);


  gulp.task('pl:watch', function () {
    var plGlob = path.normalize(plSource + '/**/*.{' + watchedExtensions + '}');
    console.log('glob files', plGlob);

    gulp.watch(plGlob, function (event) {
      console.log('File ' + path.relative(process.cwd(), event.path) + ' was ' + event.type + ', running tasks...');
      core.sh('php ' + consolePath + ' --generate', false, function () {
        if (global.OPTIONS.browserSync.patterns.enabled) {
          browserSync.get('patterns').reload();
        }

        if (global.OPTIONS.browserSync.site.enabled) {
          browserSync.get('site').reload();
        }
      });
    });
  });
};