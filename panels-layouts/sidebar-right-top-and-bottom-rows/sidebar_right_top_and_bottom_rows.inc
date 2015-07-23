<?php

$plugin = array(
  'title' => t('Right sidebar with top and bottom rows. Sidebar above on mobile (faceted search).'),
  'category' => t('Bear Skin responsive panel layouts'),
  'icon' => 'icon.png',
  'css' => 'sidebar_right_top_and_bottom_rows.css',
  'theme' => 'sidebar_right_top_and_bottom_rows',
  'regions' => array(
    'top' => t('Top Row'),
    'right' => t('Right Sidebar'),
    'center' => t('Center'),
    'bottom' => t('Bottom Row')
  )
);

function template_preprocess_sidebar_right_top_and_bottom_rows(&$variables) {
  $empty_regions = array_diff(array_keys($variables['content']), array_keys($variables['display']->panels));

  $variables['attributes_array']['class'][] = 'panel-display';
  $variables['attributes_array']['class'][] = 'panel-display--top-right-sidebar';

  foreach ($empty_regions as $key => $empty) {
    $variables['attributes_array']['class'][] = 'empty-' . $empty;
  }

  foreach ($variables['content'] as $name => $item) {
    $variables['region_attributes_array'][$name]['class'][] = ($name === 'right' || $name === 'center') ? 'column' : 'row';
    $variables['region_attributes_array'][$name]['class'][] = drupal_clean_css_identifier($name);
    $variables['region_attributes_array'][$name]['role'] = 'region';
  }
}