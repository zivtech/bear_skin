<?php

/**
 * @file
 * Contains item list theme and related functions.
 */

/**
 * Implements theme_item_list().
 */
function bear_coat_item_list($variables) {
  $items = $variables['items'];
  $title = $variables['title'];
  $type = $variables['type'];
  $attributes = $variables['attributes'];
  $output = '';

  if (isset($title)) {
    $output .= '<h3>' . $title . '</h3>';
  }

  if (!empty($items)) {
    $output .= "<$type" . drupal_attributes($attributes) . '>';
    $num_items = count($items);
    $i = 0;
    foreach ($items as $item) {
      $attributes = array();
      $children = array();
      $data = '';
      $i++;
      if (is_array($item)) {
        foreach ($item as $key => $value) {
          if ($key == 'data') {
            $data = $value;
          }
          elseif ($key == 'children') {
            $children = $value;
          }
          else {
            $attributes[$key] = $value;
          }
        }
      }
      else {
        $data = $item;
      }
      if (count($children) > 0) {
        // Render nested list.
        $data .= theme('item_list', array(
          'items' => $children,
          'title' => NULL,
          'type' => $type,
          'attributes' => $attributes,
            ));
      }
      if ($i == 1) {
        $attributes['class'][] = 'first';
      }
      if ($i == $num_items) {
        $attributes['class'][] = 'last';
      }
      $output .= '<li' . drupal_attributes($attributes) . '>' . $data . "</li>\n";
    }
    $output .= "</$type>";
  }
  return $output;
}

/**
 * Implements theme_pager_item_list().
 */
function bear_coat_pager_item_list($variables) {
  $items = $variables['items'];
  $attributes = empty($variables['attributes']) ? array() : $variables['attributes'];

  $pager_attributes = array(
    'role' => 'navigation',
    'class' => array(
      'ui',
      'pagination',
      'menu',
    ),
  );

  $pager = array(
    '#prefix' => '<div class="pager-wrapper">',
    '#suffix' => '</div>',
    '#type' => 'container',
    '#attributes' => drupal_array_merge_deep($pager_attributes, $attributes),
  );
  $pager['items'] = !empty($items) ? $items : array();

  return drupal_render($pager);
}
