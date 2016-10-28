'use strict';

var merge = require('lodash.merge');
var browserSync = require('browser-sync');
var patterns = browserSync.create('patterns');
var site = browserSync.create('site');

module.exports = function (gulp, options) {
  if (options.browserSync.patterns.enabled) {
    var plOptions = merge({}, options.browserSync.patterns, {
      snippetOptions: {
        rule: {
          match: /<\/body>/i,
          fn: function (snippet, match) {
            return snippet + match;
          }
        }
      }
    });

    patterns.init(plOptions);
  }

  if (options.browserSync.site.enabled) {
    var siteOptions = merge({}, options.browserSync.site, {
      snippetOptions: {
        rule: {
          match: /<\/body>/i,
          fn: function (snippet, match) {
            return snippet + match;
          }
        }
      }
    });

    site.init(siteOptions);
  }
};