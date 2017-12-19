var styleVariables = require('../../../../theme-settings.json');

module.exports = {
  "--c-primary": styleVariables.colorList['c-primary'],
  "--c-secondary": styleVariables.colorList['c-secondary'],
  "--c-tertiary": styleVariables.colorList['c-tertiary'],
  "--sans": styleVariables.fontList['f-sans'],
  "--serif": styleVariables.fontList['f-serif'],
  '--site-max-width': styleVariables.layout['site-max-width']
};