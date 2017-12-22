var styleVariables = require('../../../../theme-settings.json');

module.exports = {
  "--c-primary": styleVariables.colorList['c-primary'],
  "--c-secondary": styleVariables.colorList['c-secondary'],
  "--c-tertiary": styleVariables.colorList['c-tertiary'],
  "--border-color-primary": styleVariables.colorList['border-color-primary'],
  "--border-color-secondary": styleVariables.colorList['border-color-secondary'],
  "--border-color-error": styleVariables.colorList['border-color-error'],
  "--animation-transition-time": styleVariables.colorList['animation-transition-time'],

  "--bg-primary": styleVariables.bgList['bg-primary'],
  "--bg-secondary": styleVariables.bgList['bg-secondary'],
  "--bg-tertiary": styleVariables.bgList['bg-tertiary'],

  "--sans": styleVariables.fontList['f-sans'],
  "--serif": styleVariables.fontList['f-serif'],
  "--body-font-size": styleVariables.fontList['body-font-size'],
  "--h1": styleVariables.fontList['h1'],
  "--h2": styleVariables.fontList['h2'],
  "--h3": styleVariables.fontList['h3'],
  "--h4": styleVariables.fontList['h4'],
  "--h5": styleVariables.fontList['h5'],

  "--site-max-width": styleVariables.layout['site-max-width'],
  "--breakpoint-sm": styleVariables.layout['breakpoint-sm'],
  "--breakpoint-md": styleVariables.layout['breakpoint-md'],
  "--breakpoint-lg": styleVariables.layout['breakpoint-lg']
};