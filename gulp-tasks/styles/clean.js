'use strict';

var del = require('del');

module.exports = function (gulp) {
  return del([global.OPTIONS.css.dest]);
};