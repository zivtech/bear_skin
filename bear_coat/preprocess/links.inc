<?php

/**
 * @file
 * Contains links related theme functions.
 */

/**
 * Implements theme_links().
 */
function semanticui_links($variables) {
    $links = $variables['links'];
    $attributes = $variables['attributes'];
    $heading = $variables['heading'];
    global $language_url;
    $output = '';

    if (count($links) > 0) {
        $output = '';

        // Treat the heading first if it is present to prepend it to the
        // list of links.
        if (!empty($heading)) {
            if (is_string($heading)) {
                // Prepare the array that will be used when the passed heading
                // is a string.
                $heading = array(
                    'text' => $heading,
                    // Set the default level of the heading.
                    'level' => 'h2',
                );
            }
            $output .= '<' . $heading['level'];
            if (!empty($heading['class'])) {
                $output .= drupal_attributes(array('class' => $heading['class']));
            }
            $output .= '>' . check_plain($heading['text']) . '</' . $heading['level'] . '>';
        }

        $output .= '<div' . drupal_attributes($attributes) . '>';

        $num_links = count($links);
        $i = 1;

        foreach ($links as $key => $link) {
            $class = array($key);
            $link['attributes']['class'][] = 'item';

            // Add first, last and active classes to the list of links
            // to help themers.
            if ($i == 1) {
                $class[] = 'first';
            }
            if ($i == $num_links) {
                $class[] = 'last';
            }
            if (isset($link['href']) && ($link['href'] == $_GET['q'] || ($link['href'] == '<front>' && drupal_is_front_page())) && (empty($link['language']) || $link['language']->language == $language_url->language)) {
                $class[] = 'active';
            }

            if (isset($link['href'])) {
                // Pass in $link as $options, they share the same keys.
                $link['attributes']['class'] = isset($link['attributes']['class']) ? $link['attributes']['class'] : array();
                $link['attributes']['class'] += $class;
                $output .= l($link['title'], $link['href'], $link);
            } elseif (!empty($link['title'])) {
                // Some links are actually not links, but we wrap these in <span> for
                // adding title and class attributes.
                if (empty($link['html'])) {
                    $link['title'] = check_plain($link['title']);
                }
                $item_attributes = '';
                if (isset($link['attributes'])) {
                    $item_attributes = drupal_attributes($link['attributes']);
                }
                $output .= '<div' . $item_attributes . '><div>' . $link['title'] . '</div></div>';
            }

            $i++;
        }

        $output .= '</div>';
    }

    return $output;
}

/**
 * Implements theme_links__node().
 */
function semanticui_links__node($variables) {
    if (($list_class = array_search('list', $variables['attributes']['class'])) !== FALSE) {
        $variables['attributes']['class'][$list_class] = 'menu';
        $variables['attributes']['class'][] = 'secondary';
    }

    return semanticui_links($variables);
}

 /**
 * Implements theme_links__node() for forum node.
 */
function semanticui_links__node_forum($variables) {
    // Forum topic links displayed as buttons
    foreach ($variables['links'] as $key => $link) {
        $variables['links'][$key]['title'] = '<button class="mini basic ui button">' . $variables['links'][$key]['title'] . '</button>';
    }
    return semanticui_links($variables);
}

/**
 * Implements theme_menu_local_action().
 */
function semanticui_menu_local_action($variables) {
    $link = $variables['element']['#link'];

    if (isset($link['href'])) {
        $link['localized_options']['attributes']['class'][] = 'item';
        $output = l($link['title'], $link['href'], $link['localized_options']);
    } elseif (!empty($link['localized_options']['html'])) {
        $output = '<div class="item">' . $link['title'] . '</div>';
    } else {
        $output = '<div class="item">' . check_plain($link['title']) . '</div>';
    }
    $output .= "\n";

    return $output;
}

/**
 * Implements theme_links__toolbar_menu().
 */
function semanticui_links__toolbar_menu($variables) {
    if (!empty($variables['attributes']['class']) && is_array($variables['attributes']['class'])) {
        if (($ui = array_search('ui', $variables['attributes']['class'])) !== FALSE) {
            unset($variables['attributes']['class'][$ui]);
        }
        if (($links = array_search('links', $variables['attributes']['class'])) !== FALSE) {
            unset($variables['attributes']['class'][$links]);
        }
    }
    return theme_links($variables);
}

/**
 * Implements theme_links__toolbar_user().
 */
function semanticui_links__toolbar_user($variables) {
    return theme_links($variables);
}

/**
 * Implements theme_links__toolbar_home().
 */
function semanticui_links__toolbar_home($variables) {
    return theme_links($variables);
}

/**
 * Implements theme_links__contextual().
 *
 * Wraps contextual links with popup box.
 */
function semanticui_links__contextual(&$vars) {
    return '<div class="ui popup">' . semanticui_links($vars) . '</div>';
}
