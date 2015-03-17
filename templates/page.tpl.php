<div id="page" class="page-wrap m-scene">

  <div class="wrapper wrapper--header">
    <header id="header" role="banner" class="site-header">

      <?php if ($logo): ?>
        <a href="<?php print $front_page; ?>" title="<?php print t('Home'); ?>"
           rel="home" id="logo" class="site-header__logo">
          <img src="<?php print $logo; ?>" alt="<?php print t('Home'); ?>"/>
        </a>
      <?php endif; ?>

      <?php if ($site_name || $site_slogan): ?>
        <div class="site-header__name-and-slogan">
          <?php if ($site_name): ?>
            <h1 class="site-header__name">
              <a href="<?php print $front_page; ?>"
                 title="<?php print t('Home'); ?>" rel="home">
                <span><?php print $site_name; ?></span>
              </a>
            </h1>
          <?php endif; ?>

          <?php if ($site_slogan): ?>
            <h2 class="site-header__slogan">
              <?php print $site_slogan; ?>
            </h2>
          <?php endif; ?>
        </div><!-- /.site-header__name-and-slogan -->
      <?php endif; ?>

      <?php print render($page['header']); ?>

      <?php if (theme_get_setting('user_menu')): ?>
        <nav id="bear-user-menu" role="navigation" class="nav-user">
          <?php // provide userMenu label here for WAI accessibility ?>
          <h3 class="u-hidden"
              id="userMenuLabel"><?php print t('My Account Menu:') ?></h3>
          <?php print $user_menu; ?>
        </nav>
      <?php endif; ?>
    </header>
  </div>

  <div class="wrapper wrapper--navigation">
    <nav tabindex="-1" class="site-navigation main-menu">
      <?php // provide userMenu label here for WAI accessibility ?>
      <h3 class="u-hidden"
          id="mainMenuLabel"><?php print t('Main Navigation Menu:') ?></h3>
      <?php print render($page['navigation']); ?>
    </nav>
    <!-- /#navigation -->
  </div>

  <div class="wrapper wrapper--main">
    <div id="main" class="site-main">
      <main id="content" class="column main" role="main">
        <?php if (!empty($page['highlighted'])): ?>
          <div class="main__highlighted">
            <?php print render($page['highlighted']); ?>
          </div>
        <?php endif; ?>

        <?php print $breadcrumb; ?>

        <a id="main-content"></a>

        <?php if (!empty($title)): ?>
          <?php print render($title_prefix); ?>
          <h1 class="title main__title" id="page-title"><?php print $title; ?></h1>
          <?php print render($title_suffix); ?>
        <?php endif; ?>

        <?php if (!empty($messages)): ?>
          <div class="main__messages">
            <?php print $messages; ?>
          </div>
        <?php endif; ?>

        <?php if (!empty($tabs['#primary']) || !empty($tabs['#secondary'])): ?>
          <?php dpm($tabs); ?>
          <div class="main__tabs">
            <?php print render($tabs); ?>
          </div>
        <?php endif; ?>

        <?php if (!empty($page['help'])): ?>
          <div class="main__help">
            <?php print render($page['help']); ?>
          </div>
        <?php endif; ?>

        <?php if (!empty($action_links)): ?>
          <div class="main__action-links">
            <ul class="action-links"><?php print render($action_links); ?></ul>
          </div>
        <?php endif; ?>

        <div class="main__content">
          <?php print render($page['content']); ?>
        </div>

        <?php if (!empty($feed_icons)): ?>
          <div class="main__feed-icons">
            <?php print $feed_icons; ?>
          </div>
        <?php endif; ?>

      </main>
      <!-- /#content -->

      <?php if ($has_sidebar_first || $has_sidebar_second): ?>
        <aside class="site-sidebars">
          <?php print render($page['sidebar_first']); ?>
          <?php print render($page['sidebar_second']); ?>
        </aside><!-- /.sidebars -->
      <?php endif; ?>

    </div>
    <!-- /#main -->
  </div>

</div><!-- /#page -->

<div class="wrapper wrapper--footer">
  <div class="site-footer">
    <?php print render($page['footer']); ?>
  </div>
</div>
