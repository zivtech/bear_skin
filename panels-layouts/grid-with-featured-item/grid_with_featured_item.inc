<?php

$plugin = array(
  'title' => t('Grid with Featured Item'),
  'icon' => 'icon.png',
  'category' => t('Bear Skin responsive panel layouts'),
  'theme' => 'grid_with_featured_item',
  'css' => 'grid_with_featured_item.css',
  'regions' => array(
    'main' => t('Main'),
    'secondary' => t('Secondary'),
    'lower-first' => t('Lower First'),
    'lower-second' => t('Lower Second'),
    'lower-third' => t('Lower Third'),
  ),
);

/**
 * Implements hook_preprocess_featured().
 */
function template_preprocess_grid_with_featured_item(&$variables) {
  $variables['attributes_array']['class'][] = 'panel-display';
  $variables['attributes_array']['class'][] = 'panel-display--grid-with-featured-item';

  foreach($variables['content'] as $name => $item) {
    $variables['region_attributes_array'][$name]['class'][] = 'column';
    $variables['region_attributes_array'][$name]['class'][] = drupal_clean_css_identifier($name);
  }
}
