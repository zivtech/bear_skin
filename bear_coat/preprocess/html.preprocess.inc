<?php

/**
 * @file
 * Override or insert variables into the HTML templates.
 *
 * To add dynamically your own classes use
 * $vars['classes_array'][] = 'my_class';
 */

/**
 * Implements hook_preprocess_html().
 */

function bear_coat_check_library($library_name, $file_name) {
  if (!module_exists('libraries')) {
    drupal_set_message(t('Semantic UI requires the Libraries API module, please install it from https://drupal.org/project/libraries before using the theme.'), 'error', FALSE);
    return FALSE;
  }

  $path = libraries_get_path($library_name);
  if ($path && is_file($path . '/' . $file_name)) {
    return TRUE;
  }
  return FALSE;
}

function bear_coat_preprocess_html(&$vars) {
  if (bear_coat_check_library('semantic_ui', 'semantic.min.css') && bear_coat_check_library('semantic_ui', 'semantic.min.js')) {
    $vars['classes_array'][] = "semantic-ui";
  } else {
    drupal_set_message(t('Please make sure to take advantage of this theme by installing semantic UI API and its library. Proceed to the module\'s page <a href="https://www.drupal.org/project/semantic_ui_api" target="_blank">here</a>. '), 'error');
  }
  if (!module_exists('jquery_update')) {
      drupal_set_message(t('Semantic UI requires the <a href="https://www.drupal.org/project/jquery_update/">jQuery Update module</a> to be installed.'), 'error');
  } elseif (version_compare(variable_get('jquery_update_jquery_version'), '1.7', '<')) {
      drupal_set_message(t('Semantic UI requires at least jQuery 1.7. Please enable it by <a href="/admin/config/development/jquery_update/">clicking here</a>.'), 'error');
  }
}
