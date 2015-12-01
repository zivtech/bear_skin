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
}
