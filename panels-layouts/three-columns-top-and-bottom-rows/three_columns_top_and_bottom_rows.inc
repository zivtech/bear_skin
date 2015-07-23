<?php

$plugin = array(
  'title' => t('Three column with top and bottom rows'),
  'category' => t('Bear Skin responsive panel layouts'),
  'icon' => 'icon.png',
  'css' => 'three_columns_top_and_bottom_rows.css',
  'theme' => 'three_columns_top_and_bottom_rows',
  'regions' => array(
    'top' => t('Top Row'),
    'center' => t('Center'),
    'left' => t('Left Sidebar'),
    'right' => t('Right Sidebar'),
    'bottom' => t('Bottom Row')
  )
);

function template_preprocess_three_columns_top_and_bottom_rows(&$variables) {
  $empty_regions = array_diff(array_keys($variables['content']), array_keys($variables['display']->panels));

  $variables['attributes_array']['class'][] = 'panel-display';
  $variables['attributes_array']['class'][] = 'panel-display--three-column';

  foreach ($empty_regions as $key => $empty) {
    $variables['attributes_array']['class'][] = 'empty-' . $empty;
  }

  foreach ($variables['content'] as $name => $item) {
    $variables['region_attributes_array'][$name]['class'][] = ($name === 'left' || $name === 'center' || $name === 'right') ? 'column' : 'row';
    $variables['region_attributes_array'][$name]['class'][] = drupal_clean_css_identifier($name);
    $variables['region_attributes_array'][$name]['role'] = 'region';
  }
}