'use strict';

var fs = require('fs');
var path = require('path');
var mainBowerFiles = require('main-bower-files');
var inject = require('gulp-inject');
var yaml = require('js-yaml');

module.exports = function(gulp, options) {
  var files = mainBowerFiles();
  var bowerBasePath = path.join(__dirname, '../..', options.bower.src);
  var libraries = {};

  // build the libraries object in JSON
  for (var i = 0; i < files.length; i++) {
    var file = files[i].replace(bowerBasePath + '/', '');
    var fileParts = file.split('/');
    var libraryName = fileParts[0].replace(/\W+/gi, '');
    libraries[libraryName] = libraries[libraryName] || {};

    if (file.indexOf('css') >= 0) {
      libraries[libraryName].css = libraries[libraryName].css || {theme: {}};
      libraries[libraryName].css.theme['components/vendor/bower/css/' + fileParts[fileParts.length - 1]] = {minified: false};
    }

    if (file.indexOf('js') >= 0) {
      libraries[libraryName].js = libraries[libraryName].js || {};
      libraries[libraryName].js['components/vendor/bower/js/' + fileParts[fileParts.length - 1]] = {minified: false};
    }
  }

  // convert the libraries object to YAML and save to file
  var librariesYaml = yaml.safeDump(libraries);
  fs.writeFileSync('components/vendor/bower/bower.yml', librariesYaml);

  return gulp.src('bearskin8pl.libraries.yml')
    .pipe(inject(gulp.src('components/vendor/bower/bower.yml'), {
      starttag: '# inject:libraries',
      endtag: '# endinject',
      transform: function(filePath, file) {
        return file.contents.toString();
      }
    }))
    .pipe(gulp.dest('.'));
};