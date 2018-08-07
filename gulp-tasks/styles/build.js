'use strict';

var sourcemaps = require('gulp-sourcemaps');
var corepostcss = require('postcss');
var postcss = require('gulp-postcss');
var flexibility = require('postcss-flexibility');
var atImport = require('postcss-import');
var postcssPresetEnv = require('postcss-preset-env');
var mqpacker = require('css-mqpacker');
var pump = require('pump');
var notify = require('gulp-notify');
var gulpif = require('gulp-if');
var concat = require('gulp-concat');
var browserSync = require('browser-sync');
var cssnano = require('gulp-cssnano');
var cssInfo = require('gulp-css-info');
var tailwindcss = require('tailwindcss');
var purgecss = require('postcss-purgecss');

class TailwindExtractor {
  static extract(content) {
    return content.match(/[A-Za-z0-9-_:\/]+/g) || [];
  }
}

module.exports = function (gulp, cb) {
  return pump([
    // Read all CSS files.
    gulp.src(global.OPTIONS.css.src),
    // Build sourcemaps if option is enabled.
    gulpif(global.OPTIONS.buildSourceMaps, sourcemaps.init({debug: true})),
    // Resolve @import statements.
    postcss([
      atImport(),
    ]),
    // Tailwind CSS requires all CSS to be in one file for @apply directives to
    // work. To satisfy this need, we run a simple concatenation of all CSS
    // files. We must do this after resolving @import statements.
    concat('theme.css'),
    // Run remaining PostCSS processors.
    postcss([
      // Initialize Tailwind CSS framework.
      tailwindcss(global.OPTIONS.css.tailwindConfig),
      // Compile modern CSS down to something older browsers can understand.
      postcssPresetEnv({'browsers': global.OPTIONS.css.browsers}),
      // Group media queries for performance.
      mqpacker({sort: true}),
      // Provide polyfill for flexbox.
      flexibility(),
      purgecss({
        content: [
          './components/_patterns/**/*.twig',
          './templates/**/*.twig',
        ],
        extractors: [
          {
            extractor: TailwindExtractor,
            extensions: ['twig'],
          },
        ],
      }),
    ]),
    // Write sourcemaps if option is enabled.
    gulpif(global.OPTIONS.buildSourceMaps, sourcemaps.write()),
    // Minify CSS.
    cssnano({
      autoprefixer: false,
      reduceIdents: {
        keyframes: false
      },
      discardUnused: {
        keyframes: false
      }
    }),
    gulp.dest(global.OPTIONS.css.dest),
    cssInfo(),
    gulp.dest('docs'),
    gulpif(global.OPTIONS.browserSync.patterns.enabled, browserSync.get('patterns').stream({match: '**/*.css'})),
    gulpif(global.OPTIONS.browserSync.site.enabled, browserSync.get('site').stream({match: '**/*.css'})),
  ], cb);
};
