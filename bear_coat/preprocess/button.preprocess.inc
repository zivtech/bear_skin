<?php

/**
 * @file
 * Implements preprocess functions for Semantic UI button styles.
 */

/**
 * Implements hook_preprocess_button().
 */
function bear_coat_preprocess_button(&$vars) {
  $vars['element']['#attributes']['class'][] = 'button';
  $vars['element']['#attributes']['class'][] = 'ui';
  if (isset($vars['element']['#value'])) {
    if ($class = bear_coat_colorize_button($vars['element']['#value'])) {
      $vars['element']['#attributes']['class'][] = $class;
    }
  }
}

/**
 * Provides button class depending from its value.
 */
function bear_coat_colorize_button($text) {
  $generic_strings = array(
    'button' => array(
      t('Save'),
      t('Confirm'),
      t('Submit'),
      t('Search'),
    ),
    'positive' => array(
      t('Add'),
      t('Create'),
      t('Write'),
    ),
    'orange' => array(
      t('Export'),
      t('Import'),
      t('Restore'),
      t('Rebuild'),
    ),
    'button' => array(
      t('Apply'),
      t('Update'),
    ),
    'negative' => array(
      t('Delete'),
      t('Remove'),
    ),
  );

  // Generic matching last.
  foreach ($generic_strings as $class => $strings) {
    foreach ($strings as $string) {
      if (drupal_strtolower($text) == drupal_strtolower($string)) {
        return $class;
      }
    }
  }
  return FALSE;
}
