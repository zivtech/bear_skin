<?php

$plugin = array(
  'title'       => t('Three column with top and bottom rows'),
  'category'    => t('Bear Skin responsive panel layouts'),
  'icon'        => 'icon.png',
  'css' => 'three_columns_top_and_bottom_rows.css',
  'theme'       => 'three-columns-top-and-bottom-rows',

  'regions'     => array(
    'top' => t('Top Row'),
    'left' => t('Left Sidebar'),
    'center' => t('Center'),
    'right' => t('Right Sidebar'),
    'bottom' => t('Bottom Row')
  )
);


