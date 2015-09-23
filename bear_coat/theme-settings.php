<?php
/**
 * Implements hook_form_system_theme_settings_alter().
 *
 * @param $form
 *   Nested array of form elements that comprise the form.
 * @param $form_state
 *   A keyed array containing the current state of the form.
 */
function bear_coat_form_system_theme_settings_alter(&$form, &$form_state, $form_id = NULL) {
  // Work-around for a core bug affecting admin themes. See issue #943212.
  if (isset($form_id)) {
    return;
  }
  $form['bear_options'] = array(
    '#type' => 'fieldset',
    '#title' => t('Bear Theme Additional Options'),
  );

  // create an option to display the user menu
  $form['bear_options']['user_menu'] = array(
    '#type' => 'checkbox',
    '#title' => t('Add User Menu to Header (Log In, Log Out etc).'),
    '#description' => t('Disable to use the block system. <b>Can\'t be used in combination with it ot the modal login option below.</b>'),
    '#default_value' => theme_get_setting('user_menu'),
  );

  // create an option for modal login
  $form['bear_options']['login_popup'] = array(
    '#type' => 'checkbox',
    '#title' => t('Add login link in Header.'),
    '#description' => t('This login link will open in a the semantic UI modal (popup). <b>Cant be used in combination with the user menu (option above)</b>'),
    '#default_value' =>theme_get_setting('login_popup'),
  );

  // create an option for sticky footers
  $form['bear_options']['sticky_footer'] = array(
    '#type' => 'checkbox',
    '#title' => t('Add sticky footer.'),
    '#description' => t('More info about sticky footer <a href="http://www.cssstickyfooter.com/" target="_blank">here</a><br />
      You can change these settings in the the sticky-footer.css file located in the css folder.'),
    '#default_value' => theme_get_setting('sticky_footer'),
  );

}
