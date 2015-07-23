<?php

$plugin = array(
  'title' => t('One column with top and bottom rows'),
  'category' => t('Bear Skin responsive panel layouts'),
  'icon' => 'icon.png',
  'css' => 'one_column_top_and_bottom_rows.css',
  'theme' => 'one_column_top_and_bottom_rows',
  'regions' => array(
    'top' => t('Top Row'),
    'center' => t('Center Column'),
    'bottom' => t('Bottom Row')
  )
);


function template_preprocess_one_column_top_and_bottom_rows(&$variables) {
  $variables['attributes_array']['class'][] = 'panel-display';
  $variables['attributes_array']['class'][] = 'panel-display--stacked';

  foreach($variables['content'] as $name => $item) {
    $variables['region_attributes_array'][$name]['class'][] = 'row';
    $variables['region_attributes_array'][$name]['class'][] = drupal_clean_css_identifier($name);
  }
}