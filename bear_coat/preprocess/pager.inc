<?php

/**
 * @file
 * Contains pager theme and related functions.
 */

/**
 * Implements theme_pager().
 *
 * Renders a pager with next format:
 * On page 1: [1] 2 ... 15 ->
 * On page 2: <- 1 [2] 3 ... 15 ->
 * On page 3: <- 1 2 [3] 4 ... 15 ->
 * On page 4: <- 1 ... 3 [4] 5 ... 15 ->
 * On page 15: <- 1 ... 14 [15]
 */
function bear_coat_pager($variables) {
  global $pager_page_array, $pager_total;

  $output = '';
  $items = array();
  $tags = $variables['tags'];
  $element = $variables['element'];
  $parameters = $variables['parameters'];

  // Current is the page we are currently paged to.
  $pager_current = $pager_page_array[$element] + 1;
  // Max is the maximum page number.
  $pager_max = $pager_total[$element];

  $interval = 1;
  $page_new_previous = pager_load_array($pager_page_array[$element] - $interval, $element, $pager_page_array);
  $page_new_next = pager_load_array($pager_page_array[$element] + $interval, $element, $pager_page_array);

  // Prepare previous item.
  $left_arrow = '<i class="icon left arrow"></i>';
  $previous = array(
    '#theme' => 'pager_link',
    '#text' => !empty($tags[1]) ? $tags[1] : $left_arrow,
    '#page_new' => $page_new_previous,
    '#element' => $element,
    '#parameters' => $parameters,
    '#attributes' => array(
      'class' => array(
        'icon',
        'previous',
      ),
    ),
  );

  // Prepare next item.
  $right_arrow = '<i class="icon right arrow"></i>';
  $next = array(
    '#theme' => 'pager_link',
    '#text' => !empty($tags[3]) ? $tags[3] : $right_arrow,
    '#page_new' => $page_new_next,
    '#element' => $element,
    '#parameters' => $parameters,
    '#attributes' => array(
      'class' => array(
        'icon',
        'next',
      ),
    ),
  );

  $ellipsis = array(
    '#type' => 'container',
    '#attributes' => array(
      'class' => array(
        'disabled',
        'item',
      ),
    ),
  );
  $ellipsis['markup'] = array(
    '#markup' => '…',
  );

  if ($pager_max > 1) {
    if ($pager_current > 1) {
      $items[] = $previous;
    }

    if ($pager_current > 2) {
      $items[] = array(
        '#theme' => 'pager_link',
        '#text' => 1,
        '#page_new' => array($element => 0),
        '#element' => $element,
        '#parameters' => $parameters,
      );
    }
    if ($pager_current > 3) {
      $items[] = $ellipsis;
    }

    $from = ($pager_current - 1) < 1 ? 1 : ($pager_current - 1);
    $to = ($pager_current + 1) > $pager_max ? $pager_max : ($pager_current + 1);

    for ($i = $from; $i <= $to; $i++) {
      $item = array(
        '#theme' => 'pager_link',
        '#text' => $i,
        '#page_new' => array($element => $i - 1),
        '#element' => $element,
        '#parameters' => $parameters,
      );

      // Highlight current page item with active class.
      if ($i == $pager_current) {
        $item['#attributes'] = array(
          'class' => array(
            'active',
          ),
        );
      }

      $items[] = $item;
    }

    if ($pager_current < $pager_max - 2) {
      $items[] = $ellipsis;
    }
    if ($pager_current < $pager_max - 1) {
      $items[] = array(
        '#theme' => 'pager_link',
        '#text' => $pager_max,
        '#page_new' => array($element => $pager_max - 1),
        '#element' => $element,
        '#parameters' => $parameters,
      );
    }

    if ($pager_current < $pager_max) {
      $items[] = $next;
    }

    return theme('pager_item_list', array('items' => $items));
  }
  return $output;
}

/**
 * Implements theme_pager_link().
 *
 * Allows rendering pager item with <i> tag (used to render an icon, e.g. left
 * or right arrow).
 */
function bear_coat_pager_link($variables) {
  $text = $variables['text'];
  $page_new = $variables['page_new'];
  $element = $variables['element'];
  $parameters = $variables['parameters'];
  $attributes = $variables['attributes'];

  if ($page_new[$element]) {
    $parameters['page'] = $page_new[$element];
  }

  $query = array();
  if (count($parameters)) {
    $query = drupal_get_query_parameters($parameters, array());
  }
  if ($query_pager = pager_get_query_parameters()) {
    $query = array_merge($query, $query_pager);
  }

  // Set each pager link title.
  if (!isset($attributes['title'])) {
    static $titles = NULL;
    if (!isset($titles)) {
      $titles = array(
        t('‹ previous') => t('Go to previous page'),
        t('next ›') => t('Go to next page'),
      );
    }
    if (isset($titles[$text])) {
      $attributes['title'] = $titles[$text];
    }
    elseif (is_numeric($text)) {
      $attributes['title'] = t('Go to page @number', array('@number' => $text));
    }
  }

  $attributes['href'] = url($_GET['q'], array('query' => $query));
  return '<a' . drupal_attributes($attributes) . '>' . filter_xss($text, array('i')) . '</a>';
}

/**
 * Implements theme_preprocess_pager_link().
 */
function bear_coat_preprocess_pager_link(&$variables) {
  $variables['attributes']['class'][] = 'item';
}

/**
 * Implements theme_views_mini_pager().
 */
function bear_coat_views_mini_pager($vars) {
  global $pager_page_array, $pager_total;

  $tags = $vars['tags'];
  $element = $vars['element'];
  $parameters = $vars['parameters'];

  // Current is the page we are currently paged to.
  $pager_current = $pager_page_array[$element] + 1;
  // Max is the maximum page number.
  $pager_max = $pager_total[$element];

  $interval = 1;
  $page_new_previous = pager_load_array($pager_page_array[$element] - $interval, $element, $pager_page_array);
  $page_new_next = pager_load_array($pager_page_array[$element] + $interval, $element, $pager_page_array);

  // Prepare previous item.
  $left_arrow = '<i class="icon left arrow"></i>';
  $previous = array(
    '#theme' => 'pager_link',
    '#text' => !empty($tags[1]) ? $tags[1] : $left_arrow,
    '#page_new' => $page_new_previous,
    '#element' => $element,
    '#parameters' => $parameters,
    '#attributes' => array(
      'class' => array(
        'icon',
        'previous',
      ),
    ),
  );

  // Prepare next item.
  $right_arrow = '<i class="icon right arrow"></i>';
  $next = array(
    '#theme' => 'pager_link',
    '#text' => !empty($tags[3]) ? $tags[3] : $right_arrow,
    '#page_new' => $page_new_next,
    '#element' => $element,
    '#parameters' => $parameters,
    '#attributes' => array(
      'class' => array(
        'icon',
        'next',
      ),
    ),
  );

  if ($pager_total[$element] > 1) {
    if ($pager_current > 1) {
      $items[] = $previous;
    }

    $current = array(
      '#type' => 'container',
      '#attributes' => array(
        'class' => array(
          'current',
          'item',
        ),
      ),
    );
    $current['text'] = array(
      '#markup' => t('@current of @max', array('@current' => $pager_current, '@max' => $pager_max)),
    );

    $items[] = $current;

    if ($pager_current < $pager_max) {
      $items[] = $next;
    }

    return theme('pager_item_list', array('items' => $items));
  }
}
