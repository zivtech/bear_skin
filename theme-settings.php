<?php
/**
 * Implements hook_form_system_theme_settings_alter().
 *
 * @param $form
 *   Nested array of form elements that comprise the form.
 * @param $form_state
 *   A keyed array containing the current state of the form.
 */
 function bearskin8pl_form_system_theme_settings_alter(&$form, \Drupal\Core\Form\FormStateInterface &$form_state, $form_id = NULL) {
   // Work-around for a core bug affecting admin themes. See issue #943212.
   if (isset($form_id)) {
     return;
   }

  $form['bearskin_options'] = array(
    '#type' => 'fieldset',
    '#title' => t('Bear Skin Options'),
    '#description' => t('<p style="color: red; padding: 10px 0 0 0;">You may need to clear your caches after enabling or disabling these options.</p>'),
  );

  // create an option to choose between fixed and fluid layouts
  $form['bearskin_options']['ui'] = array(
    '#type' => 'radios',
    '#title' => t('UI -- Bear Skin comes either as a base theme or with a UI, which supports most of the default Drupal components.'),
    '#description' => t('Choose among the following options to add an user interface to the base theme.<br><br>'),
    '#options' => array(
      'no_ui' => t('No UI'),
      'grey_ui' => t('Grey UI'),
      'blue_ui' => t('Blue UI'),
      'green_ui' => t('Green UI'),
    ),
    '#default_value' => theme_get_setting('ui'),
  );

  // create an option for sticky footers
  $form['bearskin_options']['sticky_footer'] = array(
    '#type' => 'checkbox',
    '#title' => t('Add sticky footer.'),
    '#description' => t('This option will set a flexbox sticky footer to your site.'),
    '#default_value' => theme_get_setting('sticky_footer'),
  );
}
