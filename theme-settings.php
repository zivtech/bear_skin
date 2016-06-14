<?php
/**
 * Implements hook_form_system_theme_settings_alter().
 *
 * @param $form
 *   Nested array of form elements that comprise the form.
 * @param $form_state
 *   A keyed array containing the current state of the form.
 */

function mpgranch_theme_check_libraries($library_name, $file_name) {
  if (!module_exists('libraries')) {
    return FALSE;
  }
  $path = libraries_get_path($library_name);
  if ($path && is_file($path . '/' . $file_name)) {
    return TRUE;
  }
  return FALSE;
}

function mpgranch_theme_form_system_theme_settings_alter(&$form, &$form_state, $form_id = NULL) {
  $form['#submit'][] = 'mpgranch_theme_settings_form_submit';
  // Get all themes.
  $themes = list_themes();
  // Get the current theme
  $active_theme = $GLOBALS['theme_key'];
  $form_state['build_info']['files'][] = str_replace("/$active_theme.info", '', $themes[$active_theme]->filename) . '/theme-settings.php';

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
    '#title' => t('Add login link in header.'),
    '#description' => t('This will add a simple login/logout link in the header.'),
    '#default_value' =>theme_get_setting('login_popup'),
  );

  // create an option for modal login
  $form['bear_options']['fixed_header'] = array(
    '#type' => 'checkbox',
    '#title' => t('Fixed header on scroll up.'),
    '#description' => t('Enabling this option will give the header a fixed position when scrolling up.'),
    '#default_value' =>theme_get_setting('fixed_header'),
  );

  // create an option for sticky footers
  $form['bear_options']['sticky_footer'] = array(
    '#type' => 'checkbox',
    '#title' => t('Add sticky footer.'),
    '#description' => t('Add flexbox css display settings to implement a sticky footer.'),
    '#default_value' => theme_get_setting('sticky_footer'),
  );

  $form['home_options'] = array(
    '#type' => 'fieldset',
    '#title' => t('Homepage options'),
  );

  // create an option for sticky footers
  $form['home_options']['home_banner'] = array(
    '#type' => 'checkbox',
    '#title' => t('Add a banner on the home page.'),
    '#description' => t('Enable this option to diplay a banner image on the home page.'),
    '#default_value' => theme_get_setting('home_banner'),
  );

  // create an option for a home banner image
  $form['home_options']['home_banner_file'] = array(
    '#type'     => 'managed_file',
    '#title'    => t('Image'),
    '#description' => t('Upload your banner image. Min size is 1200px x 400px. <b></string>gif, png, jpg, svg or jpeg</b>'),
    '#required' => FALSE,
    '#upload_location' => 'public://home_banner/',
    '#upload_validators' => array(
      'file_validate_extensions' => array('gif png jpg jpeg svg'),
      'file_validate_image_resolution' => array('1200x500', '1200x500'),
    ),
    '#default_value' => theme_get_setting('home_banner_file'),
  );

  $form['home_options']['home_slogan'] = array(
    '#type' => 'textarea',
    '#title' => t('Homepage slogan'),
    '#description' => t('Add a slogan on top of the home page banner. Leave empty for no slogan.'),
    '#default_value' => theme_get_setting('home_slogan'),
  );

  $form['external_libraries'] = array(
    '#type' => 'fieldset',
    '#title' => t('Other options (third party libraries)'),
  );

  // create an option to include semantic ui library
  $form['external_libraries']['semantic_ui'] = array(
    '#type' => 'checkbox',
    '#title' => t('Include Semantic UI'),
    '#description' => t('<b>Recommended</b>. This theme is setup to use <a href="http://semantic-ui.com/" target="_blank">Semantic</a> UI for many UI/UX elements.<br>
    In order to enable, you must have <a href-"https://drupal.org/project/libraries" target="_blank">Libraries</a> installed as well as <a href="https://www.drupal.org/project/jquery_update/">jQuery Update</a> enabled and <a href="/admin/config/development/jquery_update/">set to use 1.7</a>.<br><br>
You also must have the <a href="https://www.drupal.org/project/semantic_ui_api">Semantic UI</a> module and library installed. Run <br>
<pre>drush pm-enable semantic_ui_api</pre> to install both.<br><br>
If you are installing the Semantic UI library manually, the path should look like this: <br><br>
<img src="/'. drupal_get_path('theme', 'mpgranch_theme') .'/images/sem-library.png" />'),
    '#default_value' =>theme_get_setting('semantic_ui'),
  );

  // Set drupal messages to check for dependencies
  if (theme_get_setting('semantic_ui')) {
    if (!module_exists('libraries')) :
      drupal_set_message(t('Semantic UI requires the Libraries API module, please install it from <a href-"https://drupal.org/project/libraries" target="_blank">here</a> before using the theme. Run <br>
      <pre>drush pm-enable semantic_ui_api</pre> to install both.'), 'error', FALSE);
    endif;
    if (!module_exists('semantic_ui_api')) :
      drupal_set_message(t('You have enabled semantic UI but the <b>module</b> is missing. Proceed to the module\'s page <a href="https://www.drupal.org/project/semantic_ui_api" target="_blank">here</a>.'), 'error', FALSE);
    endif;
    if (!(mpgranch_theme_check_libraries('semantic_ui', 'semantic.min.css') && mpgranch_theme_check_libraries('semantic_ui', 'semantic.min.js'))) :
      drupal_set_message(t('You have enabled semantic UI but the <b>library</b> is missing. Proceed to the module\'s page <a href="https://www.drupal.org/project/semantic_ui_api" target="_blank">here</a>. '), 'error', FALSE);
    endif;
  }
}

function mpgranch_theme_settings_form_submit(&$form, $form_state) {
  $image_fid = $form_state['values']['home_banner_file'];
  $image = file_load($image_fid);
  if (is_object($image)) {
    // Check to make sure that the file is set to be permanent.
    if ($image->status == 0) {
      // Update the status.
      $image->status = FILE_STATUS_PERMANENT;
      // Save the update.
      file_save($image);
      // Add a reference to prevent warnings.
      file_usage_add($image, 'mpgranch_theme', 'theme', 1);
     }
  }
}
