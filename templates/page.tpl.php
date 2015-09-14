<div class="wrapper wrapper--header">
  <header id="header" role="banner" class="site-header">

    <?php if ($logo): ?>
      <a href="<?php print $front_page;?>" title="<?php print t('Home');?>"
         rel="home" class="site-header__logo">
        <img src="<?php print $logo;?>" alt="<?php print t('Home');?>"/>
      </a>
    <?php endif;?>

    <?php print render($page['navigation']); ?>

    <?php if ($site_name || $site_slogan): ?>
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
          <h2 class="site-header__slogan">
            <?php print $site_slogan;?>
          </h2>
        <?php endif;?>
      </div><!-- /.site-header__name-and-slogan -->
    <?php endif;?>

    <?php print render($page['header']);?>

    <?php if (theme_get_setting('user_menu')): ?>
      <nav id="bear-user-menu" role="navigation" class="nav-user">
        <?php // provide userMenu label here for WAI accessibility ?>
        <h3 class="u-hidden"
            id="userMenuLabel"><?php print t('My Account Menu:')?></h3>
        <?php print $user_menu;?>
      </nav>
    <?php endif;?>
  </header>
</div>

<div class="wrapper wrapper--navigation">
  <!-- ****** Delete this comment on production *****
  move <?php //print render($page['navigation']); ?> to render navigation on separate row 
  ****** -->
</div>

<div class="wrapper wrapper--main">
  <div id="main" class="site-main">
    <main id="content" class="column main" role="main">
      <?php if (!empty($page['highlighted'])): ?>
        <section class="main__highlighted">
          <?php print render($page['highlighted']);?>
        </section>
      <?php endif;?>

      <?php print $breadcrumb;?>

      <a id="main-content"></a>

      <?php if (!empty($title)): ?>
        <?php print render($title_prefix);?>
        <h1 class="main__title" role="heading"><?php print $title;?></h1>
        <?php print render($title_suffix);?>
      <?php else: // this is needed for ARIA ?>
        <h1 class="u-hidden"><?php print $bear_page_title; ?></h1>
      <?php endif;?>

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
  <div class="site-footer">
    <footer id="footer">
      <?php print render($page['footer']);?>
    </footer>
  </div>
</div>