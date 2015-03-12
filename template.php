<?php

/**
 * Implements template_preprocess_html().
 * 1. Adds path variables.
 * 2. Include bear skin theme options in Drupal's JS object
 * 3. Include a CSS class on the body tag if the site uses sticky footer
 */
function bear_skin_preprocess_html(&$variables, $hook) {
  // Add variables and paths needed for HTML5 and responsive support.
  $variables['base_path'] = base_path();
  $variables['path_to_bear_skin'] = drupal_get_path('theme', 'bear_skin');

  // put some settings into javascript
  drupal_add_js(array(
    'bear_skin' => array(
      'stickyFooter' => (bool) theme_get_setting('sticky_footer'),
      'userMenu' => (bool) theme_get_setting('user_menu')
    )
  ), 'setting');

  // if the sticky footer option is selected, set a class
  if (theme_get_setting('sticky_footer')) {
    $variables['classes_array'][] = 'with-sticky-footer';
  }
}

/**
 * Implements template_preprocess_page().
 * 1. Check if sidebars have content; Add boolean to $variables
 * 2. Setup the user menu (by default displayed in header)
 */
function bear_skin_preprocess_page(&$variables) {
  $page = $variables['page'];

  // check if there is content in the sidebars
  $variables['has_sidebar_first'] = FALSE;
  $variables['has_sidebar_second'] = FALSE;
  if (!empty($page['sidebar_first'])) {
    $variables['has_sidebar_first'] = TRUE;
  }
  if (!empty($page['sidebar_second'])) {
    $variables['has_sidebar_second'] = TRUE;
  }

  // setup the user menu to display in the header
  $variables['user_menu'] = theme('links__user_menu', array(
    'links' => menu_navigation_links('user-menu'),
    'attributes' => array(
      'class ' => array('nav-user__list'),
      'aria-labelledby' => 'userMenuLabel'
    )
  ));
}

/**
 * Implements hook_css_alter().
 * 1. Remove some of Drupal's default CSS
 * 2. Force insertion of CSS as <link> tags instead of @import
 *    if CSS aggregation is turned off
 */
function bear_skin_css_alter(&$css) {
  // remove drupal's default message css
  unset($css['modules/system/system.messages.css']);
  unset($css['modules/system/system.menus.css']);
  unset($css['profiles/bear/themes/zen/system.menus.css']);

  // if css aggregation is off, include css as link tags
  // this allows livereload / guard to inject css
  if (!variable_get('preprocess_css')) {
    foreach ($css as $key => $value) {
      // Skip core files.
      $is_core = (strpos($value['data'], 'misc/') === 0 || strpos($value['data'], 'modules/') === 0);
      if (!$is_core) {
        // This option forces embeding with a link element.
        $css[$key]['preprocess'] = FALSE;
      }
    }
  }
}

/**
 * Implements template_preprocess_menu_link()
 * 1. Make a more specific CSS class for menu list items <li>
 * 2. Make a CSS class on menu list items <li> referencing their level depth
 * 3. Make a more specific CSS class for menu links <a>
 */
function bear_skin_preprocess_menu_link(&$variables, $hook) {
  $menu_name = $variables['element']['#original_link']['menu_name'];
  $variables['element']['#attributes']['class'][] = 'level-' . _bear_skin_number_to_text($variables['element']['#original_link']['depth']);
  $variables['element']['#attributes']['class'][0] = $menu_name . '__item';
  $variables['element']['#localized_options']['attributes']['class'][0] = $variables['element']['#original_link']['menu_name'] . '__link';
}

/**
 * Implements theme_links()
 * specifically for the user_menu only!
 * 1. Add a SMACCS / BEM style CSS class to <a> items
 */
function bear_skin_links__user_menu(&$variables) {
  foreach ($variables['links'] as $key => &$link) {
    $link['html'] = TRUE;
    $link['attributes'] = array('class' => 'nav-user__link');
  }
  return theme_links($variables);
}

/**
 * Implements theme_status_messages()
 * 1. Add some additional CSS classes
 * 2. Make the alerts accessible using WAI standards
 */
function bear_skin_status_messages($variables) {
  $display = $variables['display'];
  $output = '';

  $status_heading = array(
    'status' => t('Status message'),
    'error' => t('Error message'),
    'warning' => t('Warning message'),
    'success' => t('Status message')
  );
  foreach (drupal_get_messages($display) as $type => $messages) {
    $type = ($type === 'status') ? 'success' : $type;
    $output .= "<div class=\"messages--$type messages $type\">\n";
    if (!empty($status_heading[$type])) {
      $output .= '<h2 class="u-hidden">' . $status_heading[$type] . "</h2>\n";
    }
    $output .= " <ul class=\"messages__list\">\n";
    foreach ($messages as $message) {
      $output .= "  <li class=\"messages__item\" role=\"alert\" aria-live=\"assertive\">" . $message . "</li>\n";
    }
    $output .= " </ul>\n";
    $output .= "</div>\n";
  }
  return $output;
}

/**
 * Implements theme_breadcrumb()
 * 1. Make the breadcrumbs more accessible using WAI standards
 * 2. Add SMACCS / BEM style CSS classes to HTML elements in breadcrumbs
 */
function bear_skin_breadcrumb(&$variables) {
  $breadcrumb = $variables['breadcrumb'];

  $crumbs = '';
  if (!empty($breadcrumb)) {
    $crumbs = '<nav role="navigation" aria-label="breadcrumbs">' . "\n";
    $crumbs .= '<h2 class="u-hidden" id="breadcrumbLabel">' . t('You are here:') . '</h2>';
    $crumbs .= '<ul class="breadcrumbs" aria-labelledby="breadcrumbLabel">' . "\n";
    foreach ($breadcrumb as $value) {
      $value = str_replace('<a', '<a class="breadcrumbs__link"', $value);
      // the breadcrumb divider has aria-hidden, which should make it ignored by screen readers
      $crumbs .= '<li class="breadcrumbs__item">' . $value . ' <span class="breadcrumbs__divider" aria-hidden="true">&raquo;</span></li>' . "\n";
    }
    $crumbs .= '</ul>' . "\n";
    $crumbs .= '</nav>' . "\n";
  }
  return $crumbs;
}

/**
 * Implements theme_menu_local_tasks()
 * 1. Make the tabs more accessible using WAI standards
 * 2. Add SMACCS / BEM style CSS classes to HTML elements in tab containers
 */
function bear_skin_menu_local_tasks(&$variables) {
  $output = '';

  // Add theme hook suggestions for tab type.
  foreach (array('primary', 'secondary') as $type) {
    if (!empty($variables[$type])) {
      foreach (array_keys($variables[$type]) as $key) {
        if (isset($variables[$type][$key]['#theme']) && ($variables[$type][$key]['#theme'] == 'menu_local_task' || is_array($variables[$type][$key]['#theme']) && in_array('menu_local_task', $variables[$type][$key]['#theme']))) {
          $variables[$type][$key]['#theme'] = array('menu_local_task__' . $type, 'menu_local_task');
        }
      }
    }
  }

  if (!empty($variables['primary'])) {
    $variables['primary']['#prefix'] = '<h2 class="u-hidden" id="primaryTabsLabel">' . t('Primary tabs') . '</h2>';
    $variables['primary']['#prefix'] .= '<ul class="tabs-primary tabs primary" role="tablist" aria-labelledby="primaryTabsLabel">';
    $variables['primary']['#suffix'] = '</ul>';
    $output .= drupal_render($variables['primary']);
  }
  if (!empty($variables['secondary'])) {
    $variables['secondary']['#prefix'] = '<h2 class="u-hidden" id="secondaryTabsLabel">' . t('Secondary tabs') . '</h2>';
    $variables['secondary']['#prefix'] .= '<ul class="tabs-secondary tabs secondary" role="tablist" aria-labelledby="secondarTabsLabel">';
    $variables['secondary']['#suffix'] = '</ul>';
    $output .= drupal_render($variables['secondary']);
  }

  return $output;
}

/**
 * Implements theme_menu_local_task()
 * 1. Make the tab items more accessible using WAI standards
 * 2. Add SMACCS / BEM style CSS classes to HTML elements in individual tabs
 */
function bear_skin_menu_local_task($variables) {
  $type = $class = FALSE;

  $link = $variables['element']['#link'];
  $link_text = $link['title'];

  // Check for tab type set in zen_menu_local_tasks().
  if (is_array($variables['element']['#theme'])) {
    $type = in_array('menu_local_task__secondary', $variables['element']['#theme']) ? 'tabs-secondary' : 'tabs-primary';
  }

  // Add SMACSS-style class names.
  if ($type) {
    $link['localized_options']['attributes']['class'][] = $type . '__tab-link';
    $class = $type . '__tab';
  }

  $link['localized_options']['attributes']['role'] = 'tab';

  if (!empty($variables['element']['#active'])) {
    // Add text to indicate active tab for non-visual users.
    $active = ' <span class="u-hidden">' . t('(active tab)') . '</span>';

    // If the link does not contain HTML already, check_plain() it now.
    // After we set 'html'=TRUE the link will not be sanitized by l().
    if (empty($link['localized_options']['html'])) {
      $link['title'] = check_plain($link['title']);
    }
    $link['localized_options']['html'] = TRUE;
    $link_text = t('!local-task-title!active', array('!local-task-title' => $link['title'], '!active' => $active));

    if (!$type) {
      $class = 'active';
    }
    else {
      $link['localized_options']['attributes']['class'][] = 'is-active';
      $class .= ' is-active';
    }
  }

  return '<li' . ($class ? ' class="' . $class . '"' : '') . '>' . l($link_text, $link['href'], $link['localized_options']) . "</li>\n";
}

/***********************
 * Let's load some CSS on specific targets - uncomment to use
 ************************/

// function bear_skin_preprocess_node(&$vars) {
//   // Add JS & CSS by node type
//   if( $vars['type'] == 'page') {
//     //drupal_add_js(path_to_theme(). '/js/supercool_scripts.js');
//     //drupal_add_css(path_to_theme(). '/css/supercool_sheet.css');
//   }

//   // Add JS & CSS to the front page
//   if ($vars['is_front']) {
//     drupal_add_js(path_to_theme(). '/js/supercool_scripts.js');
//     //drupal_add_css(path_to_theme(). '/css/supercool_sheet.css');
//   }

//   // Add JS & CSS by node ID
//   if (drupal_get_path_alias("node/{$vars['#node']->nid}") == 'your-node-id') {
//     //drupal_add_js(path_to_theme(). '/js/supercool_scripts.js');
//     //drupal_add_css(path_to_theme(). '/css/supercool_sheet.css');
//   }
// }
// function bear_skin_preprocess_page(&$vars) {
//   // Add JS & CSS by node type
//   if (isset($vars['node']) && $vars['node']->type == 'page') {
//     //drupal_add_js(path_to_theme(). '/js/supercool_scripts.js');
//     //drupal_add_css(path_to_theme(). '/css/supercool_sheet.css');
//   }
//   // Add JS & CSS by node ID
//   if (isset($vars['node']) && $vars['node']->nid == '1') {
//     //drupal_add_js(path_to_theme(). '/js/supercool_scripts.js');
//     //drupal_add_css(path_to_theme(). '/css/supercool_sheet.css');
//   }
// }

/**
 * Convert a number to its word
 * @param $number
 * @return string
 */
function _bear_skin_number_to_text($number) {
  $number = (int) $number;
  switch ($number) {
    case 0:
      return 'top';
    case 1:
      return 'one';
    case 2:
      return 'two';
    case 3:
      return 'three';
    case 4:
      return 'four';
    case 5:
      return 'five';
    case 6:
      return 'six';
    default:
      return '';
  }
}