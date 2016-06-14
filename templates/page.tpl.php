<div class="wrapper wrapper--header top <?php if ($site_name || $site_slogan): ?>site-info-above<?php endif;?>">
  <header id="header" role="banner" class="site-header">
    <?php if ($logo): ?>
      <div id="logo-container">
        <a href="<?php print $front_page;?>" title="<?php print t('Home');?>"
           rel="home" class="site-header__logo">
          <img src="<?php print $logo;?>" alt="<?php print t('Home');?>"/>
        </a>
      </div>
    <?php endif;?>

    <?php print render($page['header']);?>
    <?php print render($page['navigation']); ?>

    <?php if (theme_get_setting('login_popup')): ?>
      <?php print render($loginpopup); ?>
    <?php endif;?>

  </header>
</div>

<?php if (drupal_is_front_page()): ?>
  <?php if (theme_get_setting('home_banner')): ?>
    <?php if (theme_get_setting('home_banner_file')): ?>
      <div class="home-page-banner" style="background-image: url('<?php print $home_banner_file_url ?>');">
        <?php if (theme_get_setting('home_slogan')): ?>
          <header><?php print theme_get_setting('home_slogan') ?></header>
        <?php endif;?>
      </div>
    <?php else : ?>
      <div class="home-page-banner default">
        <?php if (theme_get_setting('home_slogan')): ?>
          <header><?php print theme_get_setting('home_slogan') ?></header>
        <?php endif;?>
      </div>
    <?php endif;?>
  <?php endif;?>
<?php endif;?>

<?php if ($site_name || $site_slogan): ?>
  <div class="wrapper wrapper--site-info">
    <div class="site-info">
      <div class="site-header__name-and-slogan">
        <?php if ($site_name): ?>
          <span class="site-header__name">
            <a href="<?php print $front_page;?>"
               title="<?php print t('Home');?>" rel="home">
              <span><?php print $site_name;?></span>
            </a>
          </span>
        <?php endif;?>

        <?php if ($site_slogan): ?>
          <span class="site-header__slogan">
            <?php print $site_slogan;?>
          </span>
        <?php endif;?>
      </div><!-- /.site-header__name-and-slogan -->
    </div>
  </div>
<?php endif;?>

<?php if (!empty($title)): ?>
  <?php print render($title_prefix);?>
  <div class="wrapper wrapper--title">
    <div class="title-wrapper">
      <h1 class="main__title" role="heading"><?php print $title;?></h1>
    </div>
  </div>
  <?php print render($title_suffix);?>
<?php else: // this is needed for ARIA ?>
  <h1 class="u-hidden"><?php print $bear_page_title; ?></h1>
<?php endif;?>


<div class="wrapper wrapper--main">
  <div id="main" class="site-main">
    <main id="content" class="column main" role="main">
      <?php if (!empty($page['highlighted'])): ?>
        <section class="main__highlighted">
          <?php print render($page['highlighted']);?>
        </section>
      <?php endif;?>

      <a id="main-content"></a>

      <?php if (!empty($messages)): ?>
        <section class="main__messages" role="region">
          <?php print $messages;?>
        </section>
      <?php endif;?>

      <?php if (!empty($tabs['#primary']) || !empty($tabs['#secondary'])): ?>
        <nav class="main__tabs" role="navigation">
          <?php print render($tabs);?>
        </nav>
      <?php endif;?>

      <?php if (!empty($page['help'])): ?>
        <aside class="main__help" role="note">
          <?php print render($page['help']);?>
        </aside>
      <?php endif;?>

      <?php if (!empty($action_links)): ?>
        <nav class="main__action-links" role="navigation">
          <ul class="action-links"
              role="menubar"><?php print render($action_links);?></ul>
        </nav>
      <?php endif;?>

      <section class="main__content">
        <?php print render($page['content']);?>
      </section>

      <?php if (!empty($feed_icons)): ?>
        <nav class="main__feed-icons" role="navigation">
          <?php print $feed_icons;?>
        </nav>
      <?php endif;?>

    </main>
    <!-- /#content -->

    <?php if ($has_sidebar_first || $has_sidebar_second): ?>
      <aside class="site-sidebars">
        <?php print render($page['sidebar_first']);?>
        <?php print render($page['sidebar_second']);?>
      </aside><!-- /.sidebars -->
    <?php endif;?>

  </div>
  <!-- /#main -->
</div>

<div class="wrapper wrapper--footer">
  <div class="breadcrumbs-wrapper">
    <div id="breadcrumbs">
      <?php print $breadcrumb;?>
    </div>
  </div>
  <div class="site-footer">
     <footer id="footer">
      <?php print render($page['footer']);?>
    </footer>
  </div>
</div>
