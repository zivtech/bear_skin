<!DOCTYPE html>
<!--[if IEMobile 7]><html class="iem7" <?php print $html_attributes; ?>><![endif]-->
<!--[if lte IE 6]><html class="lt-ie9 lt-ie8 lt-ie7" <?php print $html_attributes; ?>><![endif]-->
<!--[if (IE 7)&(!IEMobile)]><html class="lt-ie9 lt-ie8" <?php print $html_attributes; ?>><![endif]-->
<!--[if IE 8]><html class="lt-ie9" <?php print $html_attributes; ?>><![endif]-->
<!--[if (gte IE 9)|(gt IEMobile 7)]><!--><html <?php print $html_attributes . $rdf_namespaces; ?>><!--<![endif]-->

<head class="no-js" lang="<?php echo $language; ?>" xmlns="http://www.w3.org/1999/xhtml">
  <?php print $head; ?>
  <title><?php print $head_title; ?></title>

  <?php if ($default_mobile_metatags): ?>
    <meta name="MobileOptimized" content="width">
    <meta name="HandheldFriendly" content="true">
    <meta name="viewport" content="width=device-width, initial-scale=1">
  <?php endif; ?>

  <!--[if IEMobile]><meta http-equiv="cleartype" content="on" /><![endif]-->

  <?php print $styles; ?>
  <?php print $scripts; ?>
  <script>jQuery.noConflict();</script>
</head>
<body class="<?php print $classes; ?>" <?php print $attributes;?>>
  <ul id="skip-link">
    <li><a href="#mainMenuLabel" class="element-invisible element-focusable">Navigation</a></li>
    <li><a href="#content" class="element-invisible element-focusable">Content</a></li>
    <li><a href="#footer" class="element-invisible element-focusable">Footer</a></li>
  </ul>
  <?php print $page_top; ?>
  <?php print $page; ?>
  <?php print $page_bottom; ?>

  <!--[if lt IE 9]>
  <script src="<?php print $base_path . $path_to_bear_skin; ?>/js/vendor/html5-respond.js"></script>
  <![endif]-->
  <!--[if lt IE 9]>
  <script src="<?php print $base_path . $path_to_bear_skin; ?>/js/vendor/html5.js"></script>
  <![endif]-->  
</body>
</html>
