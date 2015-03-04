'use strict';
module.exports = function (grunt) {
  // Load all tasks
  require('load-grunt-tasks')(grunt);
  // Show elapsed time
  require('time-grunt')(grunt);

  var pkg = require('./package.json');

  grunt.initConfig({

    app: {
      dist: 'dist',
      assets: 'assets'
    },

    watch: {
      styles: {
        files: ['<%= app.assets %>/sass/**/*.scss'],
        tasks: ['newer:compass']
      }
      //scripts: {
      //  files: ['<%= app.assets %>/js/**/*.js'],
      //  tasks: ['newer:uglify']
      //}
      //images: {
      //  files: ['<%= app.assets %>/images/**/*.{png,jpg,jpeg,gif,webp,svg}'],
      //  tasks: ['imagemin']
      //}
    },

    browserSync: {
      files: {
        src: [
          'bearskin.info',
          'templates/*.php',
          '*.php',
          '<%= app.assets %>/**/*.{png,jpg,jpeg,gif,webp,svg,scss,css,js}'
        ]
      },
      options: {
        watchTask: true,
        ghostMode: {
          clicks: true,
          scroll: true,
          links: true,
          forms: true
        },
        proxy: 'bearskin-dev.local'
      }
    },

    modernizr: {
      dist: {
        outputFile: '<%= app.assets %>/js/modernizr.js',
        tests: ['respond', 'svg', 'mq', 'touch', 'localstorage', 'inputtypes'],
        uglify: false,
        parseFiles: false
      }
    },

    compass: {
      bearskin: {
        options: {
          config: 'config.rb'
        }
      }
    },

    autoprefixer: {
      options: {
        browsers: ['last 2 versions', 'ie 8', 'ie 9']
      },
      bearskin: {
        expand: true,
        flatten: true,
        src: '<%= app.assets %>/css/*.css',
        dest: '<%= app.assets %>/css/'
      }
    },

    uglify: {
      bearskin: {
        options: {
          sourceMap: true,
          sourceMapName: '<%= app.dist %>/js/bearskin.map'
        },
        files: {
          '<%= app.dist %>/js/bearskin.min.js': [
            '<%= app.assets %>/js/scripts.js'
          ]
        }
      },
      vendor: {
        options: {
          sourceMap: true,
          sourceMapName: '<%= app.dist %>/js/vendor.map'
        },
        files: {
          '<%= app.dist %>/js/vendor.min.js': [
            '<%= app.assets %>/js/modernizr.js'
          ]
        }
      }
    },

    imagemin: {
      bearskin: {
        files: [{
          expand: true,
          cwd: '<%= app.assets %>/images',
          src: ['**/*.{png,jpg,gif}'],
          dest: '<%= app.dist %>/images'
        }]
      }
    },

    clean: ['<%= app.assets %>/css']


  });

  // Register tasks
  grunt.registerTask('default', [
    'clean',
    'compass',
    'browserSync',
    'watch'
  ]);

  grunt.registerTask('build', [
    'clean',
    'compass'
  ]);

};