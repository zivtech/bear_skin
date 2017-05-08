var pa11y = require('gulp-pa11y');

module.exports = function (gulp, options) {
  return pa11y({
    url: 'bear8.vm',
    standard: 'WCAG2' + options.css.wcagCompliance,
    timeout: 30000,
    failOnError: true,
    showFailedOnly: false,
    debug: true,
    phantom: {
      parameters: {
        'webSecurity': false
      }
    }
  });
}
