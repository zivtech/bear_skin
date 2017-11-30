(function ($, Drupal) {

  Drupal.behaviors.bsMobileNavigation = {
    attach: function (context, settings) {

      // define the navigation to be turned into a mobile one
      var $mainMenu = $('.menu--main', context);

      if ($mainMenu.length) {
        $mainMenu.once('bsMobileNavigation').each(function (i) {

          // elements that toggle mobile menu
          var $nav = $('#mnav', context);

          $nav.on('click', function () {
            $(this).toggleClass('open');
            $mainMenu.toggleClass('open');
          });
        });
      }
    }
  };

  Drupal.behaviors.bsSearchForm = {
    attach: function (context, settings) {

      // search toggle
      var $searchToggle = $('#msearch', context);
      var $searchContainer = $('#msearch-content', context);
      var $searchWrapper = $searchContainer.find('.js-form-type-search');
      var $searchField = $searchContainer.find('.form-search');

      // search content
      var $mainSearch = $('#msearch-content', context);
      if ($searchToggle.length && $mainSearch.length) {
        $mainSearch.once('bsSearchForm').each(function (i) {

          $searchField.attr('placeholder', 'Search');

          // search form closing toggle
          var $closer = $('#msearch-close', context);

          $searchToggle.on('click', function () {
            $mainSearch.toggleClass('open');
            $searchField
              .focus();
            setTimeout(function () {
              $searchWrapper
                .addClass('active');
            }, 100);
          });

          $closer.on('click', function () {
            $mainSearch.removeClass('open');
            $searchField
              .blur();
            $searchWrapper
              .removeClass('active');
          });

          $('.wrapper-main').on('click', function (e) {
            $mainSearch.removeClass('open');
            $searchField
              .blur();
            $searchWrapper
              .removeClass('active');
          });
        });
      }
    }
  };

})(jQuery, Drupal);
