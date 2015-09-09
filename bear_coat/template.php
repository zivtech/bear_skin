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