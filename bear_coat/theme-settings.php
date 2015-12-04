<?php
/**
 * Implements hook_form_system_theme_settings_alter().
 *
 * @param $form
 *   Nested array of form elements that comprise the form.
 * @param $form_state
 *   A keyed array containing the current state of the form.
 */

function bear_coat_check_libraries($library_name, $file_name) {
  if (!module_exists('libraries')) {
    return FALSE;
  }
  $path = libraries_get_path($library_name);
  if ($path && is_file($path . '/' . $file_name)) {
    return TRUE;
  }
  return FALSE;
}

function bear_coat_form_system_theme_settings_alter(&$form, &$form_state, $form_id = NULL) {
  // Work-around for a core bug affecting admin themes. See issue #943212.
  if (isset($form_id)) {
    return;
  }
  $form['bear_options'] = array(
    '#type' => 'fieldset',
    '#title' => t('Bear Theme Additional Options'),
  );

  // create an option to display the user menu
  $form['bear_options']['main_layout'] = array(
    '#type' => 'radios',
    '#title' => t('General Layout'),
    '#description' => t('This option will allow you to pick between a full width (fluid) layout (for background, banners etc, content still has max width) and fixed layout.'),
    '#options' => array(
      'fluid' => t('Fluid'),
      'fixed' => t('Fixed'),
    ),
    '#default_value' => theme_get_setting('main_layout'),
  );

  // create an option for modal login
  $form['bear_options']['login_popup'] = array(
    '#type' => 'checkbox',
    '#title' => t('Add login link in Header.'),
    '#description' => t('This login link will open in a the semantic UI modal (popup). <b>Can\'t be used in combination with the user menu (option above)</b>.'),
    '#default_value' =>theme_get_setting('login_popup'),
  );

  // create an option for sticky footers
  $form['bear_options']['sticky_footer'] = array(
    '#type' => 'checkbox',
    '#title' => t('Add sticky footer.'),
    '#description' => t('More info about sticky footer <a href="http://www.cssstickyfooter.com/" target="_blank">here</a><br />
      You can change these settings in the the sticky-footer.css file located in the css folder.'),
    '#default_value' => theme_get_setting('sticky_footer'),
  );

  $form['external_libraries'] = array(
    '#type' => 'fieldset',
    '#title' => t('Other Bear Claw options (third party libraries)'),
  );

  // create an option to include semantic ui library
  $form['external_libraries']['semantic_ui'] = array(
    '#type' => 'checkbox',
    '#title' => t('Include Semantic UI'),
    '#description' => t('<b>Recommended</b>. This theme is setup to use <a href="http://semantic-ui.com/" target="_blank">Semantic</a> UI for many UI/UX elements.<br>
    In order to enable, you must have <a href-"https://drupal.org/project/libraries" target="_blank">Libraries</a> installed as well as <a href="https://www.drupal.org/project/jquery_update/">jQuery Update</a> enabled and <a href="/admin/config/development/jquery_update/">set to use 1.7</a>.<br><br>
You also must have the <a href="https://www.drupal.org/project/semantic_ui_api">Semantic UI</a> module and library installed. Run <br>
<pre>drush pm-enable semantic_ui_api</pre> to install both.<br><br>
If you are installing the Semantic UI library manually, the path should be look like the following: <br><br>
<img src="/'. drupal_get_path('theme', 'bear_coat') .'/images/sem-library.png" />'),
    '#default_value' =>theme_get_setting('semantic_ui'),
  );

  // Set drupal messages to check for dependencies
  if (theme_get_setting('semantic_ui')) {
    if (!module_exists('libraries')) :
      drupal_set_message(t('Semantic UI requires the Libraries API module, please install it from <a href-"https://drupal.org/project/libraries" target="_blank">here</a> before using the theme.'), 'error', FALSE);
    endif;
    if (!module_exists('semantic_ui_api')) :
      drupal_set_message(t('You have enabled semantic UI but the <b>module</b> is missing. Proceed to the module\'s page <a href="https://www.drupal.org/project/semantic_ui_api" target="_blank">here</a>.'), 'error', FALSE);
    endif;
    if (!(bear_coat_check_libraries('semantic_ui', 'semantic.min.css') && bear_coat_check_libraries('semantic_ui', 'semantic.min.js'))) :
      drupal_set_message(t('You have enabled semantic UI but the <b>library</b> is missing. Proceed to the module\'s page <a href="https://www.drupal.org/project/semantic_ui_api" target="_blank">here</a>. '), 'error', FALSE);
    endif; 
  }

}
