<div class="wrapper wrapper--header">
  <section id="container-header">
    <header id="header" role="banner" class="site-header">

      <?php if ($logo): ?>
        <div class="site-header__logo">
          <a href="<?php print $front_page;?>" title="<?php print t('Home');?>" rel="home">
            <img src="<?php print $logo;?>" alt="<?php print t('Home');?>"/>
          </a>
        </div>
      <?php endif;?>

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

      <?php print render($page['header']);?>
      <?php print render($page['navigation']); ?>

    </header>
  </section>
</div>


<div class="wrapper wrapper--main">
  <section id="container-main" class="site-main">

    <main id="content" class="column main" role="main">

      <?php if (!empty($title)): ?>
        <?php print render($title_prefix);?>
        <h1 class="main__title" role="heading"><?php print $title;?></h1>
        <?php print render($title_suffix);?>
      <?php else: // this is needed for ARIA ?>
        <h1 class="visually-hidden"><?php print $title; ?></h1>
      <?php endif;?>

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

  </section>
  <!-- /#main -->
</div>

<div class="wrapper wrapper--footer">

  <section id="container-footer">

    <div class="site-breadcrumbs">
      <?php print $breadcrumb;?>
    </div>

    <footer id="footer" class="site-footer">
      <?php print render($page['footer']);?>
    </footer>

  </section>

</div>
