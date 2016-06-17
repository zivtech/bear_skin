'use strict';

// core utilities
var defaultConfig   = require('./config.json'),
    gulp            = require('gulp'),
    gutil           = require('gulp-util'),
    notify          = require('gulp-notify'),
    argv            = require('yargs').argv,
    gulpif          = require('gulp-if'),
    clean           = require('gulp-clean'),
    browserSync     = require('browser-sync').create();

// css utilities
var sass            = require('gulp-sass'),
    cssGlobbing     = require('gulp-css-globbing'),
    postcss         = require('gulp-postcss'),
    autoprefixer    = require('autoprefixer'),
    mqpacker        = require('css-mqpacker'),
    run             = require('gulp-run'),
    sourcemaps      = require('gulp-sourcemaps');

// js utilities
var jshint          = require('gulp-jshint'),
    stylish         = require('jshint-stylish');

// image utilities
var imagemin        = require('gulp-imagemin');

//  should we build sourcemaps? "gulp build --sourcemaps"
var buildSourceMaps = !!argv.sourcemaps;

// post CSS processors
var processors = [
  autoprefixer({browsers: ['last 2 version']}), // specify browser compatibility with https://github.com/ai/browserslist
  mqpacker // this will reorganize css into media query groups, better for performance
];

// create settings from config file and arguments
var config = {
  drush: {
    alias: argv.drushAlias || defaultConfig.drush.alias
  },
  browserSync: {
    hostname: argv.hostname || defaultConfig.browserSync.hostname,
    openAutomatically: argv.openAutomatically || defaultConfig.browserSync.openAutomatically,
    reloadDelay: argv.reloadDelay || defaultConfig.browserSync.reloadDelay,
    injectChanges: argv.injectChanges || defaultConfig.browserSync.injectChanges,
    notify: argv.notify || defaultConfig.browserSync.notify,
    online: argv.online || defaultConfig.browserSync.online
  }
};

// error notifications
var handleError = function (task) {
  return function (err) {
    gutil.beep();

    notify.onError({
      title: task,
      message: err.message,
      sound: false,
      icon: false
    })(err);

    gutil.log(gutil.colors.bgRed(task + ' error:'), gutil.colors.red(err));

    this.emit('end');
  };
};

gulp.task('sass', function () {
  gutil.log(gutil.colors.yellow('Compiling the theme CSS!'));
  return gulp.src('./sass/*.scss')
    .pipe(cssGlobbing({
      extensions: ['.scss']
    }))
    .pipe(gulpif(buildSourceMaps, sourcemaps.init()))
    .pipe(sass())
    .on('error', handleError('Sass Compiling'))
    .pipe(gulpif(buildSourceMaps, sourcemaps.write()))
    .pipe(postcss(processors))
    .on('error', handleError('Post CSS Processing'))
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('panels', function () {
  gutil.log(gutil.colors.yellow('Compiling the panel layouts CSS!'));
  return gulp.src('./panels-layouts/**/*.scss')
    .pipe(cssGlobbing({
      extensions: ['.scss']
    }))
    .pipe(gulpif(buildSourceMaps, sourcemaps.init()))
    .pipe(sass())
    .on('error', handleError('Sass Compiling'))
    .pipe(gulpif(buildSourceMaps, sourcemaps.write()))
    .pipe(postcss(processors))
    .pipe(gulp.dest('./panels-layouts'))
    .on('error', handleError('Post CSS Processing'));
});

gulp.task('scripts', function () {
  gutil.log(gutil.colors.yellow('Reviewing JavaScript files!'));
  return gulp.src('./js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter(stylish))
    .on('error', handleError('JS Linting'));
});

gulp.task('images', function () {
  gutil.log(gutil.colors.yellow('Crunching images!'));
  return gulp.src('./images/**/*.{gif,jpg,png}')
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}]
    }))
    .on('error', handleError('Image optimization'))
    .pipe(gulp.dest('./images/'));
});

gulp.task('browserSync', function() {
  browserSync.init({
    proxy: config.browserSync.hostname,
    open: config.browserSync.openAutomatically,
    reloadDelay: config.browserSync.reloadDelay,
    injectChanges: config.browserSync.injectChanges,
    notify: config.browserSync.notify,
    online: config.browserSync.online,
    browser: ["google chrome", "firefox"]
  });
});

gulp.task('watch', ['browserSync'], function() {
  gulp.watch("./css/bear_skin.css");
  gulp.watch("./sass/**/*.scss", ['sass'], ['styleguide']);
  gulp.watch("./js/*.js", ['scripts']);
  gulp.watch("./images/**/*.{gif,jpg,png}", ['images']);
  gulp.watch("./templates/**/*.php");
});

gulp.task('default', ['sass', 'panels', 'watch']);
gulp.task('styles', ['sass', 'panels']);
gulp.task('build', ['sass', 'panels', 'scripts', 'images']);


//************************************************************//


// CSS regression tools
gulp.task('create-reference', function() {
  run('(cd ./node_modules/backstopjs; npm run reference)').exec();
});

gulp.task('run-test', function() {
  run('(cd ./node_modules/backstopjs; npm run test)').exec();
});
