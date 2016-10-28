'use strict';

var runSequence = require('run-sequence');

module.exports = function (gulp, options) {
  return runSequence('bower:collect', 'bower:libraries');
};