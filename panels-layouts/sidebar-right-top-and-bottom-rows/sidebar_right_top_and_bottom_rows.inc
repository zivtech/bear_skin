<?php

$plugin = array(
  'title'       => t('Two column (right sidebar) with top and bottom rows. Sidebar above on mobile (faceted search).'),
  'category'    => t('Bear Skin responsive panel layouts'),
  'icon'        => 'icon.png',
  'css' => 'sidebar_right_top_and_bottom_rows.css',
  'theme'       => 'sidebar-right-top-and-bottom-rows',

  'regions'     => array(
    'top' => t('Top Row'),
    'right' => t('Right Sidebar'),
    'center' => t('Center'),
    'bottom' => t('Bottom Row')
  )
);


