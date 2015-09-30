<?php

/**
 * Implements hook_preprocess_table().
 */
function bear_coat_preprocess_table(&$variables) {
  $variables['attributes']['class'][] = 'ui';
  $variables['attributes']['class'][] = 'celled';
  $variables['attributes']['class'][] = 'table';
  $variables['attributes']['class'][] = 'unstackable';
}
