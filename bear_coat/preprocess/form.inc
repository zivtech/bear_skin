<?php

/**
 * @file
 * Implements hook_form_alter() to alter forms.
 */

/**
 * Implements hook_form_alter().
 */
function bear_coat_form_alter(array &$form, array &$form_state = array(), $form_id = NULL) {
  $form['#attributes']['class'][] = 'ui';
  $form['#attributes']['class'][] = 'form';
  if ($form_id) {

    // IDs of forms that should be ignored. Make this configurable?
    // @todo is this still needed?
    $form_ids = array(
      'node_form',
      'system_site_information_settings',
      'user_profile_form',
      'node_delete_confirm',
    );

    // Only wrap in container for certain form.
    if (!in_array($form_id, $form_ids) && !isset($form['#node_edit_form']) && isset($form['actions']) && isset($form['actions']['#type']) && ($form['actions']['#type'] == 'actions')) {
      $form['actions']['#theme_wrappers'] = array();
    }
    switch ($form_id) {
      case 'search_form':
        // Hide default submit button.
        $form['basic']['submit']['#attributes']['class'][] = 'element-invisible';

        // Append search icon to the input.
        $form['basic']['keys']['#attributes']['placeholder'] = t('Search ...');
        $form['basic']['keys']['#attributes']['class'][] = 'prompt';
        $form['basic']['keys']['#theme_wrappers'] = array('search_block_input_wrapper');
        break;

      case 'search_block_form':
        $form['#attributes']['class'][] = 'search-form';
        $form['actions']['submit']['#attributes']['class'][] = 'element-invisible';

        $form['search_block_form']['#attributes']['placeholder'] = t('Search ...');
        $form['search_block_form']['#attributes']['class'][] = 'prompt';
        $form['search_block_form']['#theme_wrappers'] = array('search_block_input_wrapper');

        // Removed "form" class as Semantic UI styles search input differently
        // inside the "form".
        if (($form_class = array_search('form', $form['#attributes']['class'])) !== FALSE) {
          unset($form['#attributes']['class'][$form_class]);
        }
        break;

      case 'user_login_block':
        $form['name']['#attributes']['placeholder'] = t('Username');
        $form['pass']['#attributes']['placeholder'] = t('Password');
        break;

      case 'user_login':
        $form['#attributes']['class'][] = 'segment';
        $form['name']['#attributes']['placeholder'] = t('Username');
        $form['pass']['#attributes']['placeholder'] = t('Password');
        break;

      case 'user_register_form':
        $form['#attributes']['class'][] = 'segment';
        $form['account']['name']['#attributes']['placeholder'] = t('Username');
        $form['account']['mail']['#attributes']['placeholder'] = t('Email');
        break;

      case 'user_pass':
        $form['#attributes']['class'][] = 'segment';
        $form['name']['#attributes']['placeholder'] = t('Username or e-mail address');
        break;
      
      case 'comment_node_forum_form':
        $form['#attributes']['class'][] = 'reply';
        break;
    }
  }
  // Add default class to form.
  $form['actions']['submit']['#attributes']['class'][] = 'huge';
  $form['actions']['submit']['#attributes']['class'][] = 'ui';
  $form['actions']['submit']['#attributes']['class'][] = 'button';
}

/**
 * Theme function for block search input.
 */
function bear_coat_search_block_input_wrapper(&$variables) {
  $input_wrapper = array(
    '#type' => 'container',
    '#attributes' => array(
      'class' => array(
        'ui',
        'fluid',
        'search',
        'icon',
        'input',
      ),
    ),
  );
  $input_wrapper['input'] = array(
    '#markup' => $variables['element']['#children'],
  );
  $input_wrapper['icon'] = array(
    '#markup' => '<i class="search icon"></i>',
  );

  return drupal_render($input_wrapper);
}

function bear_coat_form_views_exposed_form_alter(&$form, $form_state) {
  if ($form['#id'] == 'views-exposed-form-site-search-panel-pane-1') { //change this to whatever form ID is outputed by your view
    $form['#attributes']['class'] =  array('ui', 'search-form');
    $form['query']['#attributes']['placeholder'] = t('Search...');
    $form['query']['#attributes']['class'][] = 'prompt';
    $form['query']['#field_suffix'] = '<i class="search icon"></i>';
    $form['submit']['#attributes']['class'][] = 'element-invisible';
  }
}

/**
 * Implements theme_form_element().
 */
function bear_coat_form_element($variables) {
  $element = &$variables['element'];
  $is_checkbox = FALSE;
  $is_radio = FALSE;

  // This function is invoked as theme wrapper, but the rendered form element
  // may not necessarily have been processed by form_builder().
  $element += array(
    '#title_display' => 'before',
  );

  // Add element #id for #type 'item'.
  if (isset($element['#markup']) && !empty($element['#id'])) {
    $attributes['id'] = $element['#id'];
  }
  // Check for errors and set correct error class.
  $error_text = form_get_error($element);
  if (isset($element['#parents']) && $error_text !== NULL && !empty($element['#validated'])) {
    $element['#attributes']['class'][] = 'error1';
    _form_set_class($element, array('error'));
    $error = 'error';
  }
  else {
    $error = '';
  }
  // Making popup error message
  if ($error_text !== NULL && theme_get_setting('bear_coat_error_popups') == 1) {
    $error_message = '<div class="ui pointing red basic label">' . $error_text . '</div>';
  }
  else {
    $error_message = '';
  }

  // Add element's #type and #name as class to aid with JS/CSS selectors.
  $attributes['class'] = array('form-item');
  $attributes['class'][] = 'field';
  $attributes['class'][] = $error;

  if (!empty($element['#type'])) {
    $attributes['class'][] = drupal_html_class('form-type-' . $element['#type']);
  }
  if (!empty($element['#name'])) {
    $attributes['class'][] = drupal_html_class('form-item-' . $element['#name']);
  }
  // for exposed filter search fields
  if ($element['#name'] == "query") {
    $attributes['class'] = array('ui', 'fluid', 'search', 'icon', 'input');
  }
  // Add a class for disabled elements to facilitate cross-browser styling.
  if (!empty($element['#attributes']['disabled'])) {
    $attributes['class'][] = 'disabled';
  }
  if (!empty($element['#autocomplete_path']) && drupal_valid_path($element['#autocomplete_path'])) {
    $attributes['class'][] = 'autocomplete';
  }
  if (isset($element['#type'])) {
    if ($element['#type'] == "radio") {
      unset($attributes['class']);
      $attributes['class'][] = 'ui';
      $attributes['class'][] = 'radio';
      $attributes['class'][] = 'checkbox';
      $attributes['class'][] = 'form-item';
      $is_radio = TRUE;
    }
    elseif ($element['#type'] == "checkbox") {
      unset($attributes['class']);
      $attributes['class'][] = 'ui';
      $attributes['class'][] = 'checkbox';
      $attributes['class'][] = 'form-item';
      $is_checkbox = TRUE;
      if (isset($element['#title'])) {
        if ($element['#title_display'] == 'invisible') {
          $attributes['class'][] = 'tab-label';
        }
      }
      else {
        $attributes['class'][] = 'tab-label';
      }
    }
    elseif ($element['#type'] == 'file') {
      $attributes['class'][] = 'ui';
      $attributes['class'][] = 'input';
    }
    else if ($element['#type'] == "select") {
      unset($attributes['class']);
      $attributes['class'][] = 'form-item field';
    }
  }

  // Add requird class to the element wrapper because Semantic UI will use it
  // to append required aterisk.
  if (isset($element['#required']) && $element['#required']) {
    $attributes['class'][] = 'required';
  }

  // Show field description in a popup.
  $popup_description = theme_get_setting('bear_coat_popup_description');
  if (!empty($element['#description']) && $popup_description == 1) {
    $attributes['data-html'][] = $element['#description'];
  }

  if (isset($element['#wrapper_attributes'])) {
    $attributes = drupal_array_merge_deep($attributes, $element['#wrapper_attributes']);
  }

  $output = '<div' . drupal_attributes($attributes) . '>' . "\n";

  // If #title is not set, we don't display any label or required marker.
  if (!isset($element['#title'])) {
    $element['#title_display'] = 'none';
  }
  $prefix = isset($element['#field_prefix']) ? '<span class="field-prefix">' . $element['#field_prefix'] . '</span> ' : '';
  $suffix = isset($element['#field_suffix']) ? ' <span class="field-suffix">' . $element['#field_suffix'] . '</span>' : '';

  switch ($element['#title_display']) {
    case 'before':
    case 'invisible':
      $output .= ' ' . theme('form_element_label', $variables);
      $output .= ' ' . $prefix . $element['#children'] . $suffix . "\n";
      break;

    case 'after':
      if ($is_radio || $is_checkbox) {
        $output .= ' ' . $prefix . $element['#children'] . $suffix;
      }
      else {
        $variables['#children'] = ' ' . $prefix . $element['#children'] . $suffix;
      }
      $output .= ' ' . theme('form_element_label', $variables) . "\n";
      break;

    case 'none':
    case 'attribute':
      // Output no label and no required marker, only the children.
      $output .= ' ' . $prefix . $element['#children'] . $suffix . "\n";
      break;
  }

  if (!empty($element['#description']) && $popup_description == 0) {
    $output .= '<p class="description">' . $element['#description'] . "</p>\n";
  }

  $output .= $error_message;
  $output .= "</div>\n";

  return $output;
}

function bear_coat_select($variables) {
  $element = $variables['element'];
  element_set_attributes($element, array('id', 'name', 'size'));
  _form_set_class($element, array('ui search dropdown'));

  return '<select' . drupal_attributes($element ['#attributes']) . '>' . form_select_options($element) . '</select>';
}

/**
 * Implements theme_button().
 */
function bear_coat_button($variables) {
  $element = $variables['element'];
  $label = check_plain($element['#value']);
  element_set_attributes($element, array(
    'id',
    'name',
    'value',
    'type',
      )
  );

  $element['#attributes']['class'][] = 'button';

  // Add in the button type class.
  $element['#attributes']['class'][] = drupal_html_class('form-' . $element['#button_type']);
  if (!empty($element['#attributes']['disabled'])) {
    $element['#attributes']['class'][] = 'form-button-disabled';
  }

  // This line break adds inherent margin between multiple buttons.
  return '<input' . drupal_attributes($element['#attributes']) . '>' . '' . "</input>\n";
}

/**
 * Implements theme_textfield().
 */
function bear_coat_textfield($variables) {
  $element = $variables['element'];
  $element['#attributes']['type'] = 'text';
  element_set_attributes($element, array(
    'id',
    'name',
    'value',
    'size',
    'maxlength',
      )
  );
  _form_set_class($element, array('form-text'));

  $extra = '';
  if ($element['#autocomplete_path'] && drupal_valid_path($element['#autocomplete_path'])) {
    drupal_add_library('system', 'drupal.autocomplete');
    $element['#attributes']['class'][] = 'form-autocomplete';

    $attributes = array();
    $attributes['type'] = 'hidden';
    $attributes['id'] = $element['#attributes']['id'] . '-autocomplete';
    $attributes['value'] = url($element['#autocomplete_path'], array('absolute' => TRUE));
    $attributes['disabled'] = 'disabled';
    $attributes['class'][] = 'autocomplete';
    $extra = '<input' . drupal_attributes($attributes) . ' />';
  }
  $output = '<input' . drupal_attributes($element['#attributes']) . ' />';

  return $output . $extra;
}

/**
 * Implements theme_password().
 */
function bear_coat_password($variables) {
  $element = $variables['element'];
  $element['#attributes']['type'] = 'password';
  element_set_attributes($element, array('id', 'name', 'size', 'maxlength'));
  _form_set_class($element, array('form-text'));

  return '<input' . drupal_attributes($element['#attributes']) . ' />';
}

/**
 * Implements theme_textarea().
 */
function bear_coat_textarea($variables) {
  $element = $variables['element'];
  element_set_attributes($element, array('id', 'name', 'cols', 'rows'));
  _form_set_class($element, array('form-textarea'));

  $wrapper_attributes = array(
    'class' => array('form-textarea-wrapper'),
  );

  // Add resizable behavior.
  if (!empty($element['#resizable'])) {
    drupal_add_library('system', 'drupal.textarea');
    $wrapper_attributes['class'][] = 'resizable';
  }
  $output = '<div' . drupal_attributes($wrapper_attributes) . '>';
  $output .= '<textarea' . drupal_attributes($element['#attributes']) . '>' . check_plain($element['#value']) . '</textarea>';
  $output .= '</div>';
  return $output;
}

/**
 * Implements theme_form_element_label().
 */
function bear_coat_form_element_label(&$variables) {
  $element = $variables['element'];

  // Determine if certain things should skip for checkbox or radio elements.
  $skip = (isset($element['#type']) && ('checkbox' === $element['#type'] || 'radio' === $element['#type']));

  // If title and required marker are both empty, output no label.
  if ((!isset($element['#title']) || $element['#title'] === '' && !$skip) && empty($element['#required'])) {
    return '';
  }

  // Function check_plain() was replaced by filter_xss_admin() because
  // some titles can use image tags, e.g. for country
  // icons (as it does countryicons module).
  $title = filter_xss_admin($element['#title']);

  $attributes = array();

  // Style the label as class option to display inline with the element.
  if ($element['#title_display'] == 'after' && !$skip) {
    $attributes['class'][] = $element['#type'];
  }
  // Show label only to screen readers to avoid disruption in visual flows.
  elseif ($element['#title_display'] == 'invisible') {
    $attributes['class'][] = 'element-invisible';
  }

  if (!empty($element['#id'])) {
    $attributes['for'] = $element['#id'];
  }

  // Insert radio and checkboxes inside label elements.
  $output = '';
  if (isset($variables['#children'])) {
    $output .= $variables['#children'];
  }

  // Append label.
  $output .= t('!title', array('!title' => $title));

  // The leading whitespace helps visually separate fields from inline labels.
  // There is no required asterisk as it is appended automatically
  // by Semantic UI framework.
  return ' <label' . drupal_attributes($attributes) . '>' . $output . "</label>\n";
}

/**
 * Implements theme_file_managed_file().
 */
function bear_coat_file_managed_file($variables) {
  $element = $variables['element'];

  $attributes = array();
  if (isset($element['#id'])) {
    $attributes['id'] = $element['#id'];
  }
  if (!empty($element['#attributes']['class'])) {
    $attributes['class'] = (array) $element['#attributes']['class'];
  }
  $attributes['class'][] = 'form-managed-file';
  $attributes['class'][] = 'ui';
  $attributes['class'][] = 'icon';
  $attributes['class'][] = 'input';

  $element['upload_button']['#prefix'] = '<span class="ui icon button element-invisible">';
  $element['upload_button']['#suffix'] = '</span>';
  $element['remove_button']['#prefix'] = '<span class="ui icon button element-invisible">';
  $element['remove_button']['#suffix'] = '</span>';

  if (!empty($element['filename'])) {
    $element['filename']['#prefix'] = '<div class="ui icon input">';
    $element['filename']['#suffix'] = '</div>';
  }

  $hidden_elements = array();
  foreach (element_children($element) as $child) {
    if ($element[$child]['#type'] === 'hidden') {
      $hidden_elements[$child] = $element[$child];
      unset($element[$child]);
    }
  }

  // This wrapper is required to apply JS behaviors and CSS styling.
  $output = '';
  $output .= '<div' . drupal_attributes($attributes) . '>';
  $output .= drupal_render_children($element);
  $output .= $variables['element']['#children'];
  $output .= '<button type="submit" class="ui icon button">';
  $output .= '<i class="upload icon"></i>';
  $output .= '</button>';
  $output .= '</div>';
  $output .= render($hidden_elements);
  return $output;
}

/**
 * Implements theme_fieldset().
 */
function bear_coat_fieldset($variables) {
  $element = $variables['element'];
  element_set_attributes($element, array('id'));
  _form_set_class($element, array('form-wrapper'));

  $output = '<fieldset' . drupal_attributes($element['#attributes']) . '>';
  if (!empty($element['#title'])) {
    if (!empty($element['#collapsed'])) {
      $caret_icon = '<i class="caret right icon"></i>';
    }
    else {
      $caret_icon = '<i class="caret down icon"></i>';
    }
    // Always wrap fieldset legends in a SPAN for CSS positioning.
    $output .= '<legend><span class="fieldset-legend">' . $caret_icon . $element['#title'] . '</span></legend>';
  }
  $output .= '<div class="fieldset-wrapper">';
  if (!empty($element['#description'])) {
    $output .= '<div class="fieldset-description">' . $element['#description'] . '</div>';
  }
  $output .= $element['#children'];
  if (isset($element['#value'])) {
    $output .= $element['#value'];
  }
  $output .= '</div>';
  $output .= "</fieldset>\n";
  return $output;
}

/**
 * Implements theme_labeled_button().
 */
function bear_coat_labeled_button(&$variables) {
  $element = $variables['element'];
  $element['#attributes']['type'] = 'submit';
  element_set_attributes($element, array('id', 'name', 'value'));

  $element['#attributes']['class'][] = 'form-' . $element['#button_type'];
  if (!empty($element['#attributes']['disabled'])) {
    $element['#attributes']['class'][] = 'form-button-disabled';
  }

  $output = '<button' . drupal_attributes($element['#attributes']) . '>';
  $output .= drupal_render($element['#label']);
  $output .= '</button>';
  return $output;
}
