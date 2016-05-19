<?php

// Turn on and off preprocess functions

require_once dirname(__FILE__) . '/preprocess/form.inc';
require_once dirname(__FILE__) . '/preprocess/breadcrumb.inc';
require_once dirname(__FILE__) . '/preprocess/menu.inc';
// require_once dirname(__FILE__) . '/preprocess/message.inc';
// require_once dirname(__FILE__) . '/preprocess/links.inc';
// require_once dirname(__FILE__) . '/preprocess/status_report.inc';
require_once dirname(__FILE__) . '/preprocess/item_list.inc';
require_once dirname(__FILE__) . '/preprocess/pager.inc';

require_once dirname(__FILE__) . '/preprocess/html.preprocess.inc';
require_once dirname(__FILE__) . '/preprocess/button.preprocess.inc';
require_once dirname(__FILE__) . '/preprocess/table.preprocess.inc';


/**
 * Implements hook_css_alter().
 */
function bear_coat_css_alter(&$css) {
  $exclude = array(
    'modules/aggregator/aggregator.css' => FALSE,
    'modules/comment/comment.css' => FALSE,
    'modules/system/system.css' => FALSE,
    'modules/system/system.menus.css' => FALSE,
    'modules/system/system.messages.css' => FALSE,
    'modules/system/system.theme.css' => FALSE,
    'modules/user/user.css' => FALSE,
    'modules/search/search.css' => FALSE,
    'modules/filter/filter.css' => FALSE,
    'modules/field/theme/field.css' => FALSE,
    'modules/forum/forum.css' => FALSE,
    'misc/vertical-tabs.css' => FALSE,
    'profiles/bear/libraries/chosen/chosen.css' => FALSE,
    'profiles/bear/modules/contrib/chosen/css/chosen-drupal.css' => FALSE,
  );
  $css = array_diff_key($css, $exclude);
}

/**
 * Implements hook_js_alter().
 */
function bear_coat_js_alter(&$js) {
  $exclude = array(
    'profiles/bear/libraries/chosen/chosen.jquery.min.js' => FALSE,
    'profiles/bear/modules/contrib/chosen/chosen.js' => FALSE,
  );
  $js = array_diff_key($js, $exclude);
}

/**
 * Implements hook_theme().
 */
function bear_coat_theme($existing, $type, $theme, $path) {
  return array(
    'search_block_input_wrapper' => array(
      'render element' => 'element',
      'function' => 'bear_coat_search_block_input_wrapper',
    ),
    'pager_item_list' => array(
      'variables' => array(
        'items' => array(),
      ),
    ),
    'labeled_button' => array(
      'render element' => 'element',
    ),
  );
}

function bear_coat_preprocess_page(&$variables) {
  global $user;
  if (!user_is_logged_in()) {
    $variables['loginpopup'] = '<div class="header-log"><a class="loginpopup item floated in" href="/user"><i class="setting icon"></i> Login</a></div>';
  }
  else {
    $variables['loginpopup'] = '<div class="header-log"><a class="loginpopup logout item floated out" href="/user/logout"><i class="setting icon"></i> Logout</a>';
  }
  // registering the home banner theme setting image URL
  $file = '';
  $fid = theme_get_setting('home_banner_file');

  if(!empty($fid)) {
    $file = file_load($fid);
    if (isset($file->uri)) {
      $variables['home_banner_file_url'] = file_create_url($file->uri);
    }
  }
}


/**
 * Implements template_preprocess_menu_link()
 * 1. Make a more specific CSS class for menu list items <li>
 * 2. Make a CSS class on menu list items <li> referencing their level depth
 * 3. Make a more specific CSS class for menu links <a>
 * 4. Set ARIA roles and properties for accessibility
 * 5. Save the menu name and depth as attributes
 */
function bear_coat_preprocess_menu_link(&$variables, $hook) {
  $menu_name = $variables['element']['#original_link']['menu_name'];
  $depth_word = _bear_coat_number_to_text($variables['element']['#original_link']['depth']);

  $is_active = in_array('active', $variables['element']['#attributes']['class']);
  $has_children = $variables['element']['#original_link']['expanded'] && $variables['element']['#original_link']['has_children'];

  // <li> elements
  $variables['element']['#attributes']['class'] = array();
  $variables['element']['#attributes']['class'][] = $menu_name . '__item';
  $variables['element']['#attributes']['class'][] = 'level-' . $depth_word;

  // Add classes based on links.
  $path_array = explode('/', $variables['element']['#href']);
  foreach ($path_array as $arg) {
    if (!isset($class)) {
      $class = $arg;
    }
    else {
      $class = $class . '-' . $arg;
    }
    $variables['element']['#attributes']['class'][] = $class;
  }

  if ($has_children) {
    $variables['element']['#attributes']['class'][] = "parent";
  }
  if ($is_active) {
    $variables['element']['#attributes']['class'][] = 'active';
  }
  $variables['element']['#attributes']['role'] = 'presentation';

  // <a> elements
  $variables['element']['#localized_options']['attributes']['class'] = array();
  $variables['element']['#localized_options']['attributes']['class'][] = $menu_name . '__link';
  if ($is_active) {
    $variables['element']['#localized_options']['attributes']['class'][] = 'active';
  }
  $variables['element']['#localized_options']['attributes']['role'] = 'menuitem';
  $variables['element']['#localized_options']['attributes']['aria-haspopup'] = ($has_children) ? 'true' : 'false';

  // save the menu name and depth as data attributes
  // this is a hack so that the <ul class="menu"> element can ultimately have
  // CSS classes that reflect the specific menu name and its depth in the tree
  $variables['element']['#attributes']['data-menu-name'] = $menu_name;
  $variables['element']['#attributes']['data-menu-depth'] = $depth_word;
}


/**
 * Convert a number to its word
 * @param $number
 * @return string
 */
function _bear_coat_number_to_text($number) {
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
