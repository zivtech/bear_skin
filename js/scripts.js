(function ($, Drupal) {

  Drupal.behaviors.bsMobileNavigation = {
    attach: function (context) {

      // define the navigation to be turned into a mobile one
      var $mainMenu = $('.menu--main', context);

      if ($mainMenu.length) {
        $mainMenu.once('bsMobileNavigation').each(function () {

          // elements that toggle mobile menu
          var $menuOpen = $('#menu-open', context);
          var $menuClose = $('#menu-close', context);
          var $searchToggle = $('#search-open', context);

          $menuOpen.on('click', function () {
            $(this).addClass('opaque');
            $searchToggle.addClass('opaque');
            $mainMenu.addClass('open');
          });

          $menuClose.on('click', function () {
            $menuOpen.removeClass('opaque');
            $searchToggle.removeClass('opaque');
            $mainMenu.removeClass('open');
          });
        });
      }
    }
  };

  Drupal.behaviors.bsSearchForm = {
    attach: function (context, settings) {

      // search toggle
      var $searchToggle = $('#search-open', context);
      var $searchContainer = $('#msearch-content', context);
      var $searchWrapper = $searchContainer.find('.js-form-type-search');
      var $searchField = $searchContainer.find('.form-search');
      var $menuOpen = $('#menu-open', context);

      // search content
      var $mainSearch = $('#msearch-content', context);

      if ($searchToggle.length && $mainSearch.length) {
        $mainSearch.once('bsSearchForm').each(function () {

          $searchField.attr('placeholder', 'Search');

          $(this).find('.form-actions').addClass('icon');

          // search form closing toggle
          var $closer = $('#search-close', context);

          $searchToggle.on('click', function () {
            $mainSearch.addClass('open');
            $searchField.focus();
            $(this).addClass('opaque');
            $menuOpen.addClass('opaque');
            setTimeout(function () {
              $searchWrapper
                .addClass('active');
            }, 100);
          });

          $closer.on('click', function () {
            $mainSearch.removeClass('open');
            $searchField.blur();
            $searchWrapper.removeClass('active');
            $searchToggle.removeClass('opaque');
            $menuOpen.removeClass('opaque');
          });

          $('.wrapper-main').on('click', function (e) {
            $mainSearch.removeClass('open');
            $searchField.blur();
            $searchWrapper.removeClass('active');
            $searchToggle.removeClass('opaque');
            $menuOpen.removeClass('opaque');
          });
        });
      }
    }
  };

})(jQuery, Drupal);
