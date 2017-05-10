var core = require('../core.js');

module.exports = function (gulp, options) {
  var command = './node_modules/.bin/pa11y '
  + '--standard ' + options.accessibility.wcagCompliance + ' '
  + '--reporter ' + options.accessibility.pa11yReporter + ' '
  + options.paths.devUrl;

  if (options.accessibility.pa11yReporter.toLowerCase() != 'cli') {
    core.checkResultsDir();
    command += ' > audit-results/' +
    options.accessibility.wcagCompliance +
    '-standards-results.' +
    options.accessibility.pa11yReporter.toLowerCase();
  }

  return core.sh(command, true, function () {
    console.log('Finished the pa11y test.');
  });
}
