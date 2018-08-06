var core = require('../core.js');

module.exports = function (gulp) {
  return core.sh(
  './node_modules/.bin/specificity-graph ' +
  'css/theme.css ' +
  '--output audit-results/specificity-graph ' +
  '--browser ',
  true,
  function() {
    console.log('Specificity-graph files created in audit directory.')
  })
};
