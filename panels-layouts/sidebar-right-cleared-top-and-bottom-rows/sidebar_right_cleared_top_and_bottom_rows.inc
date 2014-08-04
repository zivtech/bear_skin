<?php

$plugin = array(
  'title'       => t('Two column (right sidebar) with top and bottom rows. Sidebar clears below content.'),
  'category'    => t('Bear Skin responsive panel layouts'),
  'icon'        => 'icon.png',
  'css' => 'sidebar_right_cleared_top_and_bottom_rows.css',
  'theme'       => 'sidebar-right-cleared-top-and-bottom-rows',

  'regions'     => array(
    'top' => t('Top Row'),
    'center' => t('Center'),
    'right' => t('Right Sidebar'),
    'bottom' => t('Bottom Row')
  )
);


