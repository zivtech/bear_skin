<?php
/**
 * Implements hook_form_system_theme_settings_alter().
 *
 * @param $form
 *   Nested array of form elements that comprise the form.
 * @param $form_state
 *   A keyed array containing the current state of the form.
 */
function bear_skin_form_system_theme_settings_alter(&$form, &$form_state, $form_id = NULL) {
  $form['bear_options'] = array(
    '#type' => 'fieldset',
    '#title' => t('Bear Skin Theme Additional Options'),
  );

  // create an option to choose between fixed and fluid layouts
  $form['bear_options']['main_layout'] = array(
    '#type' => 'radios',
    '#title' => t('General Layout'),
    '#description' => t('This option will allow you to pick between a full width (fluid) layout or fixed width layout. Both are responsive.'),
    '#options' => array(
      'fluid' => t('Fluid'),
      'fixed' => t('Fixed'),
    ),
    '#default_value' => theme_get_setting('main_layout'),
  );

  // create an option for sticky footers
  $form['bear_options']['sticky_footer'] = array(
    '#type' => 'checkbox',
    '#title' => t('Add sticky footer.'),
    '#description' => t('This option will set a flexbox sticky footer to your site.'),
    '#default_value' => theme_get_setting('sticky_footer'),
  );
}
