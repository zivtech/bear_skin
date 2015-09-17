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
function semanticui_breadcrumb($variables) {
  $breadcrumb = $variables['breadcrumb'];
  $semanticui_breadcrumb = theme_get_setting('semanticui_breadcrumb');
  if ($semanticui_breadcrumb == 1 && !empty($breadcrumb)) {
    $breadcrumbs = '<h2 class="element-invisible">' . t('You are here') . '</h2>';

    $breadcrumbs .= '<div class="ui list">';
    $breadcrumbs .= '<div class="ui breadcrumb top aligned">';
    foreach ($breadcrumb as $value) {
      $breadcrumbs .= $value . '<i class="right chevron icon divider"></i>';
    }
    $title = check_plain(strip_tags(drupal_get_title()));
    $breadcrumbs .= '<div class="active section">' . $title . '</div>';
    $breadcrumbs .= '</div>';
    $breadcrumbs .= '</div>';
    return $breadcrumbs;
  }
}

/**
 * Implements hook_menu_breadcrumb_alter().
 */
function semanticui_menu_breadcrumb_alter(&$active_trail, $item) {
  foreach ($active_trail as $key => $item) {
    $active_trail[$key]['localized_options']['attributes']['class'][] = 'section';
  }
}
