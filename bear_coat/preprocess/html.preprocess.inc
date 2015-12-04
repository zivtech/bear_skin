<?php

/**
 * @file
 * Override or insert variables into the HTML templates.
 *
 * To add dynamically your own classes use
 * $vars['classes_array'][] = 'my_class';
 */


/**
 * Implements check_library().
 */
function bear_coat_check_library($library_name, $file_name) {
  if (!module_exists('libraries')) {
    return FALSE;
  }
  $path = libraries_get_path($library_name);
  if ($path && is_file($path . '/' . $file_name)) {
    return TRUE;
  }
  return FALSE;
}

/**
 * Implements hook_preprocess_html().
 */
function bear_coat_preprocess_html(&$vars) {
  if (bear_coat_check_library('semantic_ui', 'semantic.min.css') && bear_coat_check_library('semantic_ui', 'semantic.min.js') && theme_get_setting('semantic_ui') && module_exists('semantic_ui_api')) {
    $vars['classes_array'][] = "semantic-ui";
  }
  if (!module_exists('jquery_update')) :
    drupal_set_message(t('This theme requires the <a href="https://www.drupal.org/project/jquery_update/" target="_blank">jQuery Update module</a> to be installed.'), 'error', FALSE);
  elseif (version_compare(variable_get('jquery_update_jquery_version'), '1.7', '<')) :
    drupal_set_message(t('This theme requires at least jQuery 1.7. Please enable it by <a href="/admin/config/development/jquery_update/">clicking here</a>.'), 'error', FALSE);
  endif;
  if (module_exists('responsive_menus')) :
    $vars['classes_array'][] = "resp-nav";
  endif;
}
