<?php

/**
 * Implements template_preprocess_html().
 * Adds path variables.
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
 */
function bear_skin_preprocess_page(&$variables) {
  $page = $variables['page'];

  // check if there is content in the sidebars
  $variables['has_sidebar_first'] = false;
  $variables['has_sidebar_second'] = false;
  if (!empty($page['sidebar_first'])) {
    $variables['has_sidebar_first'] = true;
  }
  if (!empty($page['sidebar_second'])) {
    $variables['has_sidebar_second'] = true;
  }

  // setup the user menu to display in the header
  $variables['user_menu'] = theme('links', array(
    'links' => menu_navigation_links('user-menu'),
    'attributes' => array(
      'class ' => array('links-list', 'site-menu')
    )
  ));
}

/**
 * Implements hook_css_alter().
 *
 */
function bear_skin_css_alter(&$css) {
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
 * @param $variables
 * @param $hook
 */
function bear_skin_preprocess_menu_link(&$variables, $hook) {
  // Replace the generic link class from Zen with something more specific
  $variables['element']['#attributes']['class'][0] = $variables['element']['#original_link']['menu_name'] . '__item';
  $variables['element']['#localized_options']['attributes']['class'][0] = $variables['element']['#original_link']['menu_name'] . '__link';
}

/**
 * Implements hook_preprocess_links()
 */
function bear_skin_links(&$variables) {
  // for any menu that runs drupal's default render
  // add a class to help with styling
  foreach ($variables['links'] as $key => &$link) {
    $link['attributes'] = array('class' => 'links-list__link');
  }
  return theme_links($variables);
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
