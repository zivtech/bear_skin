<?php
/**
 * Implements hook_form_system_theme_settings_alter().
 *
 * @param $form
 *   Nested array of form elements that comprise the form.
 * @param $form_state
 *   A keyed array containing the current state of the form.
 */
function bear_coat_form_system_theme_settings_alter(&$form, &$form_state, $form_id = NULL) {

  $form['bear_options'] = array(
    '#type' => 'fieldset',
    '#title' => t('Bear Claw Theme Additional Options'),
    '#description' => t('<p style="color: red; padding: 10px 0 0 0;">You will need to clear your caches after enabling or disabling these options.</p>'),
  );

  // create an option to choose between fixed and fluid layouts
  $form['bear_options']['main_layout'] = array(
    '#type' => 'radios',
    '#title' => t('General Layout'),
    '#description' => t('This option will allow you to pick between a full width (fluid) layout or fixed width layout. Both are responsive.'),
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
    '#description' => t('This will add a simple login link in Header.'),
    '#default_value' =>theme_get_setting('login_popup'),
  );

  // create an option for sticky footers
  $form['bear_options']['sticky_footer'] = array(
    '#type' => 'checkbox',
    '#title' => t('Add sticky footer.'),
    '#description' => t('This option will set a flexbox sticky footer to your site.'),
    '#default_value' => theme_get_setting('sticky_footer'),
  );

  $form['external_libraries'] = array(
    '#type' => 'fieldset',
    '#title' => t('Other Bear Claw options (third party libraries)'),
    '#description' => t('<p style="color: red; padding: 10px 0 0 0;">You will need to clear your caches after enabling or disabling these options.</p>'),
  );

  // create an option to include semantic ui library
  $form['external_libraries']['semantic_ui'] = array(
    '#type' => 'checkbox',
    '#title' => t('Include Semantic UI'),
    '#description' => t('<b>Recommended</b>. This theme is setup to use <a href="http://semantic-ui.com/" target="_blank">Semantic</a> UI for many UI/UX elements.<br>
    In order to enable, download the plugin at <a href="https://github.com/Semantic-Org/Semantic-UI" target="_blank">https://github.com/Semantic-Org/Semantic-UI</a> and place the uncompressed directory in the bear_coat root directory and rename it to "semantic_ui".<br>
The path should be <b>bear_coat/semantic_ui/</b>. You can also cd into bear_coat and run git clone https://github.com/Semantic-Org/Semantic-UI.git semantic_ui && git clone https://github.com/artberri/sidr.git sidr'),
    '#default_value' =>theme_get_setting('semantic_ui'),
  );

  // create an option to include the SIDR responsive menu
  $form['external_libraries']['sidr'] = array(
    '#type' => 'checkbox',
    '#title' => t('Include the SIDR responsive menu'),
    '#description' => t('<b>Recommended</b>. The <a href="http://www.berriart.com/sidr/" target="_blank">SIDR</a> menu will turn your main navigation into a responsive navigation under 800px.<br>
In order to enable, download the plugin at <a href="https://github.com/artberri/sidr" target="_blank">https://github.com/artberri/sidr</a> and place the uncompressed directory in the bear_coat root directory and rename it to "sidr".<br>
The path should be <b>bear_coat/sidr/</b>. You can also cd into bear_coat and run git clone https://github.com/Semantic-Org/Semantic-UI.git semantic_ui && git clone https://github.com/artberri/sidr.git sidr'),
    '#default_value' => theme_get_setting('sidr'),
  );

  // display messages to the user if any library is missing
  if (theme_get_setting('sidr')) {
    $sidr_path_js = drupal_get_path('theme', 'bear_coat') . '/sidr/dist/jquery.sidr.js';
    $sidr_path_css = drupal_get_path('theme', 'bear_coat') . '/sidr/dist/stylesheets/jquery.sidr.light.css';
    if (file_exists($sidr_path_js) && file_exists($sidr_path_css)) {
      drupal_set_message(t('Sidr is properly installed!'));
    }
    else {
      drupal_set_message(t('Sidr is not properly installed yet. You must download the plugin <a href="https://github.com/artberri/sidr" target="_blank">here</a> and place the uncompressed directory in the bear_coat theme root folder.'), 'error');
    }
  }
  if (theme_get_setting('semantic_ui')) {
    $semantic_ui_path_js = drupal_get_path('theme', 'bear_coat') . '/semantic_ui/dist/semantic.js';
    $semantic_ui_path_css = drupal_get_path('theme', 'bear_coat') . '/semantic_ui/dist/semantic.css';
    if (file_exists($semantic_ui_path_js) && file_exists($semantic_ui_path_css)) {
      drupal_set_message(t('Semantic UI is properly installed!'));
    }
    else {
      drupal_set_message(t('Semantic UI is not properly installed yet. You must download the plugin <a href="https://github.com/Semantic-Org/Semantic-UI" target="_blank">here</a> and place the uncompressed directory in the bear_coat theme root folder.'), 'error');
    }
  }

}
