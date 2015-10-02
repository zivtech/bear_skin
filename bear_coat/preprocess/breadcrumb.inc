<?php

/**
 * @file
 * Contains breadcrumb theme and related functions.
 */

/**
 * Implements theme_breadrumb().
 *
 * Prints breadcrumbs as a list, with chevron divider.
 */
function bear_coat_breadcrumb($variables) {
  $breadcrumb = $variables['breadcrumb'];
  $breadcrumbs = '<h2 class="element-invisible">' . t('You are here') . '</h2>';

  $breadcrumbs .= '<nav class="ui breadcrumb">';
  foreach ($breadcrumb as $value) {
    $breadcrumbs .= $value . '<i class="right chevron icon divider"></i>';
  }
  $breadcrumbs .= '</nav>';
  return $breadcrumbs;
}

/**
 * Implements hook_menu_breadcrumb_alter().
 */
function bear_coat_menu_breadcrumb_alter(&$active_trail, $item) {
  foreach ($active_trail as $key => $item) {
    $active_trail[$key]['localized_options']['attributes']['class'][] = 'section';
  }
}
