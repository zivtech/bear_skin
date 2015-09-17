<?php

/**
 * @file
 * Contains menu related theme functions.
 */

/**
 * Implements theme_menu_tree().
 */
function semanticui_menu_tree(&$variables) {
  return '<div class="ui fluid vertical menu">' . $variables['tree'] . '</div>';
}

/**
 * Semanticui theme wrapper function for the submenu links.
 */
function semanticui_menu_tree__submenu(&$variables) {
  return '<div class="menu">' . $variables['tree'] . '</div>';
}

/**
 * Semanticui theme wrapper function for the secondary menu links.
 *
 * Here is no need in wrapper as these items are rendered in the page that
 * provides menu markup (see page.tpl.php).
 */
function semanticui_menu_tree__secondary(&$variables) {
  return '<div class="ui secondary pointing menu">' . $variables['tree'] . '</div>';
}

/**
 * Implements theme_menu_tree().
 */
function semanticui_menu_tree__shortcut_set(&$variables) {
  return theme_menu_tree($variables);
}

/**
 * Implements theme_menu_link().
 */
function semanticui_menu_link(array $variables) {
  $element = $variables['element'];

  // If there is submenu - render it with wrapper.
  if ($element['#below']) {
    $element['#below']['#theme_wrappers'] = array('menu_tree__submenu');
    $submenu_items = drupal_render($element['#below']);
    $submenu_wrapper = array(
      '#type' => 'container',
      '#attributes' => array(
        'class' => array(
          'item',
        ),
      ),
    );
    $submenu_wrapper['title'] = array(
      '#markup' => $element['#title'],
      '#prefix' => !empty($element['#prefix']) ? $element['#prefix'] : '',
      '#suffix' => !empty($element['#suffix']) ? $element['#suffix'] : '',
    );
    $submenu_wrapper['content'] = array(
      '#markup' => $submenu_items,
    );
    $output = $submenu_wrapper;
  }
  else {
    // If it is a regular menu item - render it as a link with "item" class.
    $element['#localized_options']['attributes']['class'][] = 'item';
    $output = array(
      '#type' => 'link',
      '#title' => $element['#title'],
      '#href' => $element['#href'],
      '#options' => $element['#localized_options'],
      '#prefix' => !empty($element['#prefix']) ? $element['#prefix'] : '',
      '#suffix' => !empty($element['#suffix']) ? $element['#suffix'] : '',
    );
  }
  return drupal_render($output) . "\n";
}

/**
 * Implements theme_menu_local_tasks().
 */
function semanticui_menu_local_tasks(&$variables) {
  $primary = isset($variables['primary']) ? $variables['primary'] : NULL;
  if (!empty($primary)) {
    foreach ($primary as $menu_item_key => $menu_item) {
      $variables['primary'][$menu_item_key]['#link']['localized_options'] = array(
        'attributes' => array(
          'class' => array(
            'item',
          ),
        ),
      );
    }
  }

  $secondary = isset($variables['secondary']) ? $variables['secondary'] : NULL;
  if (!empty($secondary)) {
    foreach ($secondary as $menu_item_key => $menu_item) {
      $variables['secondary'][$menu_item_key]['#link']['localized_options'] = array(
        'attributes' => array(
          'class' => array(
            'item',
          ),
        ),
      );
    }
  }

  $output = '';
  if (!empty($variables['primary'])) {
    $variables['primary']['#prefix'] = '<h2 class="element-invisible">' . t('Primary tabs') . '</h2>';
    $variables['primary']['#prefix'] .= '<div class="ui top attached tabular menu">';
    $variables['primary']['#suffix'] = '</div>';
    $output .= drupal_render($variables['primary']);
  }
  if (!empty($variables['secondary'])) {
    $variables['secondary']['#prefix'] = '<h2 class="element-invisible">' . t('Secondary tabs') . '</h2>';
    $variables['secondary']['#prefix'] .= '<div class="ui secondary attached menu">';
    $variables['secondary']['#suffix'] = '</div>';
    $output .= drupal_render($variables['secondary']);
  }
  return $output;
}

/**
 * Implements theme_menu_local_tasks().
 */
function semanticui_menu_local_task($variables) {
  $link = $variables['element']['#link'];
  $link_text = $link['title'];

  if (!empty($variables['element']['#active'])) {
    // Add text to indicate active tab for non-visual users.
    $active = '<span class="element-invisible">' . t('(active tab)') . '</span>';

    // If the link does not contain HTML already, check_plain() it now.
    // After we set 'html'=TRUE the link will not be sanitized by l().
    if (empty($link['localized_options']['html'])) {
      $link['title'] = check_plain($link['title']);
    }
    $link['localized_options']['html'] = TRUE;
    $link_text = t('!local-task-title!active', array('!local-task-title' => $link['title'], '!active' => $active));
  }

  return l($link_text, $link['href'], $link['localized_options']) . "\n";
}
