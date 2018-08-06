'use strict';

var merge = require('lodash.merge');
var browserSync = require('browser-sync');
var patterns = browserSync.create('patterns');
var site = browserSync.create('site');

module.exports = function (gulp, options) {
  if (global.OPTIONS.browserSync.patterns.enabled) {
    var plOptions = merge(
      {},
      global.OPTIONS.browserSync.patterns,
      {
        snippetOptions: {
          rule: {
            match: /<\/body>/i,
            fn: function (snippet, match) {
              return snippet + match;
            }
          }
        }
      }
    );

    patterns.init(plOptions);
  }

  if (global.OPTIONS.browserSync.site.enabled) {
    var siteOptions = merge(
      {},
      global.OPTIONS.browserSync.site,
      {
        proxy: global.OPTIONS.paths.devUrl,
        snippetOptions: {
          rule: {
            match: /<\/body>/i,
            fn: function (snippet, match) {
              return snippet + match;
            }
          }
        }
      }
    );

    site.init(siteOptions);
  }
};
