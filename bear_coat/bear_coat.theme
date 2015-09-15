<?php

/**
 * @desc Implements hook_form_alter()
 * Providing better UI elements support for FORM elements.
 */
function bear_coat_form_alter(&$form, &$form_state, $form_id) {
  $form['#attributes']['class'][] = 'ui form';
  if (isset($form['actions'])) {
    foreach ($form['actions'] as $action_key => $action) {
      if (isset($action['#type']) && $action['#type'] == 'submit') {
        $form['actions'][$action_key]['#attributes']['class'][] = 'big ui button';
      }
    }
  }
}

function bear_coat_checkboxes($variables) {
  $element = $variables ['element'];
  $attributes = array();
  if (isset($element ['#id'])) {
    $attributes ['id'] = $element ['#id'];
  }
  $attributes ['class'][] = 'form-checkboxes ui checkbox';
  if (!empty($element ['#attributes']['class'])) {
    $attributes ['class'] = array_merge($attributes ['class'], $element ['#attributes']['class']);
  }
  if (isset($element ['#attributes']['title'])) {
    $attributes ['title'] = $element ['#attributes']['title'];
  }
  return '<div' . drupal_attributes($attributes) . '>' . (!empty($element ['#children']) ? $element ['#children'] : '') . '</div>';
}

function bear_coat_radios($variables) {
  $element = $variables ['element'];
  $attributes = array();
  if (isset($element ['#id'])) {
    $attributes ['id'] = $element ['#id'];
  }
  $attributes ['class'] = 'form-radios ui radio checkbox';
  if (!empty($element ['#attributes']['class'])) {
    $attributes ['class'] .= ' ' . implode(' ', $element ['#attributes']['class']);
  }
  if (isset($element ['#attributes']['title'])) {
    $attributes ['title'] = $element ['#attributes']['title'];
  }
  return '<div' . drupal_attributes($attributes) . '>' . (!empty($element ['#children']) ? $element ['#children'] : '') . '</div>';
}