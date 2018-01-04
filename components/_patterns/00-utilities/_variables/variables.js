var styleVariables = require('../../../../theme-settings.json');

module.exports = {
  "--c-primary": styleVariables.colorList['c-primary'],
  "--c-secondary": styleVariables.colorList['c-secondary'],
  "--body-color": styleVariables.colorList['body-color'],
  "--link-color": styleVariables.colorList['link-color'],
  "--link-color-hover": styleVariables.colorList['link-color-hover'],
  "--border-color-primary": styleVariables.colorList['border-color-primary'],
  "--border-color-secondary": styleVariables.colorList['border-color-secondary'],
  "--border-color-error": styleVariables.colorList['border-color-error'],
  "--form-item-border-color": styleVariables.colorList['form-item-border-color'],
  "--form-item-focused-color": styleVariables.colorList['form-item-focused-color'],
  "--green": styleVariables.colorList['green'],
  "--red": styleVariables.colorList['red'],
  "--orange": styleVariables.colorList['orange'],

  "--animation-transition-time": styleVariables.ui['animation-transition-time'],

  "--bg-primary": styleVariables.bgList['bg-primary'],
  "--bg-secondary": styleVariables.bgList['bg-secondary'],
  "--bg-tertiary": styleVariables.bgList['bg-tertiary'],

  "--sans": styleVariables.typography['f-sans'],
  "--serif": styleVariables.typography['f-serif'],
  "--body-font-size": styleVariables.typography['body-font-size'],
  "--h1": styleVariables.typography['h1'],
  "--h2": styleVariables.typography['h2'],
  "--h3": styleVariables.typography['h3'],
  "--h4": styleVariables.typography['h4'],
  "--h5": styleVariables.typography['h5'],

  "--site-max-width": styleVariables.layout['site-max-width'],
};
