var core = require('../core.js');

module.exports = function (gulp) {
  var command = './node_modules/.bin/pa11y '
  + '--standard ' + global.OPTIONS.accessibility.wcagCompliance + ' '
  + '--reporter ' + global.OPTIONS.accessibility.pa11yReporter + ' '
  + global.OPTIONS.paths.devUrl;

  if (global.OPTIONS.accessibility.pa11yReporter.toLowerCase() != 'cli') {
    core.checkResultsDir();
    command += ' > audit-results/' +
    global.OPTIONS.accessibility.wcagCompliance +
    '-standards-results.' +
    global.OPTIONS.accessibility.pa11yReporter.toLowerCase();
  }

  return core.sh(command, true, function () {
    console.log('Finished the pa11y test.');
  });
}
